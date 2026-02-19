using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using System.Security.Claims;

using Database.User.Options;
using Database.Helpers;

using Database.Entities;

using Database.User.Contexts;

using Database.Inputs;
using Database.User.Inputs;

using Database.Models;
using Database.User.Models;

namespace Database.User.Repositories;

public class ClsAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    private readonly ClsAccessTokenHelper<ClsAccessTokenOptions> _AccessTokenHelper;
    private readonly ClsRefreshTokenHelper _RefreshTokenHelper;

    public ClsAuthenticationRepository(
        AppDBContext appDBContext,
        ClsAccessTokenHelper<ClsAccessTokenOptions> accessTokenHelper,
        ClsRefreshTokenHelper refreshTokenHelper
    )
    {
        _AppDBContext = appDBContext;

        _AccessTokenHelper = accessTokenHelper;
        _RefreshTokenHelper = refreshTokenHelper;
    }

    public async Task<ClsAccountModel<ClsUserAccountModel>> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        var newAvatarEntity = credentials.Avatar == null ? null : new ClsImageEntity
        {
            Id = credentials.Avatar.Id,
            Url = credentials.Avatar.Url,
        };
        var newLocationEntity = new ClsLocationEntity
        {
            Uuid = Guid.NewGuid(),
            Country = credentials.Location.Country,
            City = credentials.Location.City,
            Street = credentials.Location.Street,
            Latitude = credentials.Location.Latitude,
            Longitude = credentials.Location.Longitude,
        };

        var hashPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
        var newUserEntity = new ClsUserEntity
        {
            Uuid = credentials.Uuid,
            AvatarId = newAvatarEntity?.Id,
            LocationUuid = newLocationEntity.Uuid,
            Username = credentials.Username,
            Birthday = credentials.Birthday,
            PhoneNumber = credentials.PhoneNumber,
            Email = credentials.Email,
            Password = hashPassword,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false,
            DeletedAt = null,
        };

        var refreshToken = _RefreshTokenHelper.Generate();
        var hashedRefreshToken = _RefreshTokenHelper.Hash(refreshToken);

        var newRefreshTokenEntity = new ClsRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            RefreshToken = hashedRefreshToken,
            IsRevoked = false,
            ExpiresAt = credentials.RememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.UtcNow.AddDays(1),
            CreatedAt = DateTime.UtcNow,
        };
        var newUserRefreshTokenEntity = new ClsUserRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = credentials.Uuid,
            RefreshTokenUuid = newRefreshTokenEntity.Uuid,
        };

        if (newAvatarEntity != null) _AppDBContext.Images.Add(newAvatarEntity);
        _AppDBContext.Locations.Add(newLocationEntity);
        _AppDBContext.Users.Add(newUserEntity);

        _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
        _AppDBContext.UserRefreshTokens.Add(newUserRefreshTokenEntity);

        await _AppDBContext.SaveChangesAsync();

        var userAccountModel = new ClsUserAccountModel
        {
            Uuid = newUserEntity.Uuid,
            Avatar = newUserEntity.Avatar == null ? null : new ClsImageModel
            {
                Id = newUserEntity.Avatar.Id,
                Url = newUserEntity.Avatar.Url,
            },
            Location = new ClsLocationModel
            {
                Country = newUserEntity.Location.Country,
                City = newUserEntity.Location.City,
                Street = newUserEntity.Location.Street,
                Latitude = newUserEntity.Location.Latitude,
                Longitude = newUserEntity.Location.Longitude,
            },
            Username = newUserEntity.Username,
            Birthday = newUserEntity.Birthday,
            PhoneNumber = newUserEntity.PhoneNumber,
            Email = newUserEntity.Email,
        };
        return new ClsAccountModel<ClsUserAccountModel>
        {
            Account = userAccountModel,
            RefreshToken = refreshToken
        };
    }
    public async Task<ClsAccountModel<ClsUserAccountModel>> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        var user = await _AppDBContext.Users
        .AsNoTracking()
        .Where(user =>
            user.Email == credentials.Email &&
            !user.IsDeleted
        )
        .Select(user => new
        {
            Account = new ClsUserAccountModel
            {
                Uuid = user.Uuid,
                Avatar = user.Avatar == null ? null : new ClsImageModel
                {
                    Id = user.Avatar.Id,
                    Url = user.Avatar.Url,
                },
                Location = new ClsLocationModel
                {
                    Country = user.Location.Country,
                    City = user.Location.City,
                    Street = user.Location.Street,
                    Latitude = user.Location.Latitude,
                    Longitude = user.Location.Longitude,
                },
                Username = user.Username,
                Birthday = user.Birthday,
                PhoneNumber = user.PhoneNumber,
                Email = user.Email,
            },
            Password = user.Password
        })
        .FirstAsync();

        var isValidPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, user.Password, credentials.Password);
        if (isValidPassword == PasswordVerificationResult.Failed) throw new ArgumentException("Invalid password");
        if (isValidPassword == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);

            await _AppDBContext.Users
            .Where(user =>
                user.Email == credentials.Email &&
                !user.IsDeleted
            )
            .ExecuteUpdateAsync(user => user.SetProperty(user => user.Password, hashedPassword));
        }

        var refreshToken = _RefreshTokenHelper.Generate();
        var hashedRefreshToken = _RefreshTokenHelper.Hash(refreshToken);

        var newRefreshTokenEntity = new ClsRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            RefreshToken = hashedRefreshToken,
            IsRevoked = false,
            ExpiresAt = credentials.RememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.UtcNow.AddDays(1),
            CreatedAt = DateTime.UtcNow,
        };
        var newUserRefreshTokenEntity = new ClsUserRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            UserUuid = user.Account.Uuid,
            RefreshTokenUuid = newRefreshTokenEntity.Uuid,
        };

        _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
        _AppDBContext.UserRefreshTokens.Add(newUserRefreshTokenEntity);

        await _AppDBContext.SaveChangesAsync();

        var claims = new Claim[]
        {
            new Claim("Uuid", user.Account.Uuid.ToString()),
        };

        var accessToken = _AccessTokenHelper.Generate(claims);

        return new ClsAccountModel<ClsUserAccountModel>
        {
            Account = user.Account,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
    public async Task<ClsTokensModel> RefreshTokensAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var user = await _AppDBContext.Users
            .Where(user =>
                user.Uuid == credentials.Uuid &&
                !user.IsDeleted
            )
            .Select(user => new
            {
                Uuid = user.Uuid,
                RefreshTokens = _AppDBContext.UserRefreshTokens
                .Where(userRefreshToken =>
                    userRefreshToken.UserUuid == credentials.Uuid &&
                    !userRefreshToken.RefreshToken.IsRevoked &&
                    userRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
                )
                .Select(userRefreshToken => new
                {
                    Uuid = userRefreshToken.RefreshToken.Uuid,
                    ExpiresAt = userRefreshToken.RefreshToken.ExpiresAt,
                    RefreshToken = userRefreshToken.RefreshToken.RefreshToken
                })
                .ToArray(),
            })
            .FirstAsync();

            var oldRefreshToken = user.RefreshTokens
            .First(RefreshToken =>
            {
                var isValidRefreshToken = _RefreshTokenHelper.Verify(RefreshToken.RefreshToken, credentials.RefreshToken);
                return isValidRefreshToken != PasswordVerificationResult.Failed;
            });

            await _AppDBContext.RefreshTokens
            .Where(refreshToken => refreshToken.Uuid == oldRefreshToken.Uuid)
            .ExecuteUpdateAsync(refreshToken => refreshToken.SetProperty(refreshToken => refreshToken.IsRevoked, true));

            var newRefreshToken = _RefreshTokenHelper.Generate();
            var hashedRefreshToken = _RefreshTokenHelper.Hash(newRefreshToken);

            var newRefreshTokenEntity = new ClsRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                RefreshToken = hashedRefreshToken,
                IsRevoked = false,
                ExpiresAt = DateTime.SpecifyKind(oldRefreshToken.ExpiresAt, DateTimeKind.Utc),
                CreatedAt = DateTime.UtcNow,
            };
            var newUserRefreshTokenEntity = new ClsUserRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                UserUuid = credentials.Uuid,
                RefreshTokenUuid = newRefreshTokenEntity.Uuid,
            };

            _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
            _AppDBContext.UserRefreshTokens.Add(newUserRefreshTokenEntity);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var claims = new Claim[]
            {
                new Claim("Uuid", user.Uuid.ToString()),
            };

            var accessToken = _AccessTokenHelper.Generate(claims);

            return new ClsTokensModel
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken
            };
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials, ClsUserContext context)
    {
        var refreshTokens = await _AppDBContext.UserRefreshTokens
        .Where(userRefreshToken =>
            userRefreshToken.UserUuid == context.Uuid &&
            !userRefreshToken.RefreshToken.IsRevoked &&
            userRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
        )
        .Select(userRefreshToken => new
        {
            Uuid = userRefreshToken.RefreshToken.Uuid,
            RefreshToken = userRefreshToken.RefreshToken.RefreshToken
        })
        .ToArrayAsync();

        var oldRefreshToken = refreshTokens
        .First(refreshToken =>
        {
            var isValidRefreshToken = _RefreshTokenHelper.Verify(refreshToken.RefreshToken, credentials.RefreshToken);
            return isValidRefreshToken != PasswordVerificationResult.Failed;
        });

        await _AppDBContext.RefreshTokens
        .Where(refreshToken => refreshToken.Uuid == oldRefreshToken.Uuid)
        .ExecuteUpdateAsync(refreshToken => refreshToken.SetProperty(refreshToken => refreshToken.IsRevoked, true));
    }
}
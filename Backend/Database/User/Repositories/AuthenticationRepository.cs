using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;

using Database.Helpers;

using Database.Entities;

using Database.Inputs;
using Database.User.Inputs;

using Database.Models;
using Database.User.Models;
using Database.User.Contexts;

namespace Database.User.Repositories;

public class ClsAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;
    private readonly ClsRefreshTokenHelper _RefreshTokenHelper;

    public ClsAuthenticationRepository(AppDBContext appDBContext, ClsRefreshTokenHelper refreshTokenHelper)
    {
        _AppDBContext = appDBContext;
        _RefreshTokenHelper = refreshTokenHelper;
    }

    public async Task<ClsAccountModel<ClsUserAccountModel>> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newAvatar = credentials.Avatar == null ? null : new ClsImageEntity
            {
                Id = credentials.Avatar.Id,
                Url = credentials.Avatar.Url,
            };
            var newLocation = new ClsLocationEntity
            {
                Uuid = Guid.NewGuid(),
                Country = credentials.Location.Country,
                City = credentials.Location.City,
                Street = credentials.Location.Street,
                Latitude = credentials.Location.Latitude,
                Longitude = credentials.Location.Longitude,
            };

            var hashPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
            var newUser = new ClsUserEntity
            {
                Uuid = credentials.Uuid,
                AvatarId = newAvatar?.Id,
                LocationUuid = newLocation.Uuid,
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
            var newRefreshToken = new ClsRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                RefreshToken = hashedRefreshToken,
                IsRevoked = false,
                ExpiresAt = credentials.RememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.UtcNow.AddDays(1),
                CreatedAt = DateTime.UtcNow,
            };

            var newUserRefreshToken = new ClsUserRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                UserUuid = credentials.Uuid,
                RefreshTokenUuid = newRefreshToken.Uuid,
            };

            if (newAvatar != null) _AppDBContext.Images.Add(newAvatar);
            _AppDBContext.Locations.Add(newLocation);
            _AppDBContext.Users.Add(newUser);

            _AppDBContext.RefreshTokens.Add(newRefreshToken);
            _AppDBContext.UserRefreshTokens.Add(newUserRefreshToken);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var userAccountModel = new ClsUserAccountModel
            {
                Uuid = newUser.Uuid,
                Avatar = newUser.Avatar == null ? null : new ClsImageModel
                {
                    Id = newUser.Avatar.Id,
                    Url = newUser.Avatar.Url,
                },
                Location = new ClsLocationModel
                {
                    Country = newUser.Location.Country,
                    City = newUser.Location.City,
                    Street = newUser.Location.Street,
                    Latitude = newUser.Location.Latitude,
                    Longitude = newUser.Location.Longitude,
                },
                Username = newUser.Username,
                Birthday = newUser.Birthday,
                PhoneNumber = newUser.PhoneNumber,
                Email = newUser.Email,
            };
            return new ClsAccountModel<ClsUserAccountModel>
            {
                Account = userAccountModel,
                RefreshToken = refreshToken
            };
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<ClsAccountModel<ClsUserAccountModel>> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var user = await _AppDBContext.Users
            .AsNoTracking()
            .Include(user => user.Avatar)
            .Include(user => user.Location)
            .Where(user =>
                user.Email == credentials.Email &&
                !user.IsDeleted
            )
            .FirstAsync();

            var isValidPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, user.Password, credentials.Password);
            if (isValidPassword != PasswordVerificationResult.Success) throw new ArgumentException("Invalid password");
            if (isValidPassword == PasswordVerificationResult.SuccessRehashNeeded)
            {
                var trackedUser = await _AppDBContext.Users
                .Where(user => user.Email == credentials.Email)
                .FirstAsync();

                var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
                trackedUser.Password = hashedPassword;

                await _AppDBContext.SaveChangesAsync();
            }

            var refreshToken = _RefreshTokenHelper.Generate();
            var hashedRefreshToken = _RefreshTokenHelper.Hash(refreshToken);
            var newRefreshToken = new ClsRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                RefreshToken = hashedRefreshToken,
                IsRevoked = false,
                ExpiresAt = credentials.RememberMe ? DateTime.UtcNow.AddMonths(1) : DateTime.UtcNow.AddDays(1),
                CreatedAt = DateTime.UtcNow,
            };

            var newUserRefreshToken = new ClsUserRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                UserUuid = user.Uuid,
                RefreshTokenUuid = newRefreshToken.Uuid,
            };

            _AppDBContext.RefreshTokens.Add(newRefreshToken);
            _AppDBContext.UserRefreshTokens.Add(newUserRefreshToken);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var userAccountModel = new ClsUserAccountModel
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
            };
            return new ClsAccountModel<ClsUserAccountModel>
            {
                Account = userAccountModel,
                RefreshToken = refreshToken
            };
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task RefreshTokenAsync(ClsRefreshTokenInput refreshToken, ClsUserContext context)
    {
        var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var userRefreshTokens = await _AppDBContext.UserRefreshTokens
            .Where(userRefreshToken =>
                userRefreshToken.UserUuid == context.Uuid &&
                !userRefreshToken.RefreshToken.IsRevoked &&
                userRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
            )
            .ToArrayAsync();

            var userRefreshToken = userRefreshTokens.FirstOrDefault(userRefreshToken => 
                userRefreshToken.RefreshToken.RefreshToken == refreshToken.RefreshToken
            );
            foreach (var userRefreshToken in userRefreshTokens)
            {
                var isValidRefreshToken = _RefreshTokenHelper.Verify(userRefreshToken.RefreshToken.RefreshToken, refreshToken.RefreshToken);
                if (isValidRefreshToken != PasswordVerificationResult.Success) throw new ArgumentException("Invalid refresh token");

                userRefreshToken.RefreshToken.IsRevoked = true;
                break;
            }

            var newRefreshToken = new ClsRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                RefreshToken = _RefreshTokenHelper.Hash(refreshToken.RefreshToken),
                IsRevoked = false,
                ExpiresAt = ,
                CreatedAt = DateTime.UtcNow,
            };


            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials, ClsUserContext context)
    {
        var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var userRefreshTokens = await _AppDBContext.UserRefreshTokens
            .Where(userRefreshToken =>
                userRefreshToken.UserUuid == context.Uuid &&
                !userRefreshToken.RefreshToken.IsRevoked &&
                userRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
            )
            .ToArrayAsync();

            foreach (var userRefreshToken in userRefreshTokens)
            {
                var isValidRefreshToken = _RefreshTokenHelper.Verify(userRefreshToken.RefreshToken.RefreshToken, credentials.RefreshToken);
                if (isValidRefreshToken != PasswordVerificationResult.Success) throw new ArgumentException("Invalid refresh token");

                userRefreshToken.RefreshToken.IsRevoked = true;
                break;
            }

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
}
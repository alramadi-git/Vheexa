using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using System.Security.Claims;

using Database.User.Options;
using Database.Helpers;

using Database.Entities;

using Database.User.Inputs;

using Database.User.Contexts;

using Database.Models;

namespace Database.User.Repositories;

public class ClsAccountRepository
{
    private readonly AppDBContext _AppDBContext;

    private readonly ClsAccessTokenHelper<ClsAccessTokenOptions> _AccessTokenHelper;
    private readonly ClsRefreshTokenHelper _RefreshTokenHelper;

    public ClsAccountRepository(
        AppDBContext appDBContext,
        ClsAccessTokenHelper<ClsAccessTokenOptions> accessTokenHelper,
        ClsRefreshTokenHelper refreshTokenHelper
    )
    {
        _AppDBContext = appDBContext;

        _AccessTokenHelper = accessTokenHelper;
        _RefreshTokenHelper = refreshTokenHelper;
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
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using System.Security.Claims;

using Database.Partner.Options;
using Database.Helpers;

using Database.Entities;

using Database.Enums;

using Database.Partner.Contexts;

using Database.Partner.Inputs;

using Database.Models;


namespace Database.Partner.Repositories;

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
            var member = await _AppDBContext.Members
            .Where(member =>
                member.Uuid == credentials.Uuid &&
                member.Status == STATUS.ACTIVE &&
                !member.IsDeleted
            )
            .Select(member => new
            {
                Uuid = member.Uuid,
                PartnerUuid = member.PartnerUuid,
                Permissions = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == member.Role.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Type)
                .ToArray(),
                RefreshTokens = _AppDBContext.MemberRefreshTokens
                .Where(memberRefreshToken =>
                    memberRefreshToken.MemberUuid == credentials.Uuid &&
                    !memberRefreshToken.RefreshToken.IsRevoked &&
                    memberRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
                )
                .Select(memberRefreshToken => new
                {
                    Uuid = memberRefreshToken.RefreshToken.Uuid,
                    ExpiresAt = memberRefreshToken.RefreshToken.ExpiresAt,
                    RefreshToken = memberRefreshToken.RefreshToken.RefreshToken
                })
                .ToArray(),
            })
            .FirstAsync();

            var oldRefreshToken = member.RefreshTokens
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
            var newMemberRefreshTokenEntity = new ClsMemberRefreshTokenEntity
            {
                Uuid = Guid.NewGuid(),
                MemberUuid = credentials.Uuid,
                RefreshTokenUuid = newRefreshTokenEntity.Uuid,
            };

            _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
            _AppDBContext.MemberRefreshTokens.Add(newMemberRefreshTokenEntity);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var claims = new List<Claim>
            {
                new Claim("Uuid", member.Uuid.ToString()),
                new Claim("PartnerUuid", member.PartnerUuid.ToString())
            };
            claims.AddRange(member.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

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
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials, ClsMemberContext context)
    {
        var refreshTokens = await _AppDBContext.MemberRefreshTokens
        .Where(memberRefreshToken =>
            memberRefreshToken.MemberUuid == context.Uuid &&
            !memberRefreshToken.RefreshToken.IsRevoked &&
            memberRefreshToken.RefreshToken.ExpiresAt > DateTime.UtcNow
        )
        .Select(memberRefreshToken => new
        {
            Uuid = memberRefreshToken.RefreshToken.Uuid,
            RefreshToken = memberRefreshToken.RefreshToken.RefreshToken
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
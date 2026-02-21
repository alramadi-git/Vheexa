using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using System.Security.Claims;

using Database.Partner.Options;
using Database.Helpers;

using Database.Entities;

using Database.Enums;

using Database.Inputs;
using Database.Partner.Inputs;

using Database.Models;
using Database.Partner.Models;


namespace Database.Partner.Repositories;

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

    public async Task<ClsAccountModel<ClsMemberAccountModel>> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        var newLogoEntity = credentials.Logo == null ? null : new ClsImageEntity
        {
            Id = credentials.Logo.Id,
            Url = credentials.Logo.Url,
        };
        var newBannerEntity = credentials.Banner == null ? null : new ClsImageEntity
        {
            Id = credentials.Banner.Id,
            Url = credentials.Banner.Url,
        };

        var newPartnerEntity = new ClsPartnerEntity
        {
            Uuid = credentials.Uuid,
            LogoId = newLogoEntity?.Id,
            BannerId = newBannerEntity?.Id,
            Handle = credentials.Handle,
            OrganizationName = credentials.OrganizationName,
            PhoneNumber = credentials.PhoneNumber,
            Email = credentials.Email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false,
            DeletedAt = null,
        };

        var newLocationEntity = new ClsLocationEntity
        {
            Uuid = Guid.NewGuid(),
            Country = credentials.Branch.Location.Country,
            City = credentials.Branch.Location.City,
            Street = credentials.Branch.Location.Street,
            Latitude = credentials.Branch.Location.Latitude,
            Longitude = credentials.Branch.Location.Longitude,
        };
        var newBranchEntity = new ClsBranchEntity
        {
            Uuid = Guid.NewGuid(),
            PartnerUuid = newPartnerEntity.Uuid,
            LocationUuid = newLocationEntity.Uuid,
            Name = credentials.Branch.Name,
            PhoneNumber = credentials.Branch.PhoneNumber,
            Email = credentials.Branch.Email,
            MemberCount = 1,
            Status = STATUS.ACTIVE,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false,
            DeletedAt = null,
        };

        var defaultRoles = await _AppDBContext.Roles
        .Where(role =>
            role.IsDefault &&
            !role.IsAdmin
        )
        .ToArrayAsync();

        var newPartnerRoleEntities = defaultRoles
        .Select(role => new ClsPartnerRoleEntity
        {
            Uuid = Guid.NewGuid(),
            PartnerUuid = newPartnerEntity.Uuid,
            RoleUuid = role.Uuid,
            AssignedCount = 0,
            Status = STATUS.ACTIVE,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            IsDeleted = false,
            DeletedAt = null,
        }).ToArray();

        var ownerRoleUuid = new Guid("8d5df272-e00a-4fc4-89a5-f0b6028bb7c0");

        var ownerPartnerRole = newPartnerRoleEntities.First(role => role.RoleUuid == ownerRoleUuid);
        ownerPartnerRole.AssignedCount = 1;

        var newAvatarEntity = credentials.Member.Avatar == null ? null : new ClsImageEntity
        {
            Id = credentials.Member.Avatar.Id,
            Url = credentials.Member.Avatar.Url,
        };

        var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Member.Password);
        var newMemberEntity = new ClsMemberEntity
        {
            Uuid = credentials.Member.Uuid,
            PartnerUuid = newPartnerEntity.Uuid,
            RoleUuid = ownerPartnerRole.Uuid,
            BranchUuid = newBranchEntity.Uuid,
            AvatarId = newAvatarEntity?.Id,
            Username = credentials.Member.Username,
            Email = credentials.Member.Email,
            Password = hashedPassword,
            Status = STATUS.ACTIVE,
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
        var newMemberRefreshTokenEntity = new ClsMemberRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            MemberUuid = credentials.Uuid,
            RefreshTokenUuid = newRefreshTokenEntity.Uuid,
        };

        if (newLogoEntity != null) _AppDBContext.Images.Add(newLogoEntity);
        if (newBannerEntity != null) _AppDBContext.Images.Add(newBannerEntity);
        _AppDBContext.Partners.Add(newPartnerEntity);

        _AppDBContext.Locations.Add(newLocationEntity);
        _AppDBContext.Branches.Add(newBranchEntity);

        _AppDBContext.PartnerRoles.AddRange(newPartnerRoleEntities);

        if (newAvatarEntity != null) _AppDBContext.Images.Add(newAvatarEntity);
        _AppDBContext.Members.Add(newMemberEntity);

        _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
        _AppDBContext.MemberRefreshTokens.Add(newMemberRefreshTokenEntity);

        await _AppDBContext.SaveChangesAsync();

        var accountModel = new ClsMemberAccountModel
        {
            Uuid = newMemberEntity.Uuid,
            Partner = new ClsMemberAccountModel.ClsPartnerModel
            {
                Uuid = newMemberEntity.Partner.Uuid,
                Logo = newPartnerEntity.Logo == null ? null : new ClsImageModel
                {
                    Id = newPartnerEntity.Logo.Id,
                    Url = newPartnerEntity.Logo.Url,
                },
                Banner = newPartnerEntity.Banner == null ? null : new ClsImageModel
                {
                    Id = newPartnerEntity.Banner.Id,
                    Url = newPartnerEntity.Banner.Url,
                },
                Handle = newPartnerEntity.Handle,
                OrganizationName = newPartnerEntity.OrganizationName,
                PhoneNumber = newPartnerEntity.PhoneNumber,
                Email = newPartnerEntity.Email,
            },
            Role =
                {
                    Name = newMemberEntity.Role.Role.Name,
                    Permissions = await _AppDBContext.RolePermissions
                    .AsNoTracking()
                    .Where(rolePermission => rolePermission.RoleUuid == newMemberEntity.Role.RoleUuid)
                    .Select(rolePermission => rolePermission.Permission.Type)
                    .ToArrayAsync()
                },
            Avatar = newMemberEntity.Avatar == null ? null : new ClsImageModel
            {
                Id = newMemberEntity.Avatar.Id,
                Url = newMemberEntity.Avatar.Url,
            },
            Branch = new ClsMemberAccountModel.ClsBranchModel
            {
                Location = new ClsMemberAccountModel.ClsBranchModel.ClsLocationModel
                {
                    Country = newLocationEntity.Country,
                    City = newLocationEntity.City,
                    Street = newLocationEntity.Street,
                    Latitude = newLocationEntity.Latitude,
                    Longitude = newLocationEntity.Longitude,
                },
                Name = newBranchEntity.Name,
                PhoneNumber = newBranchEntity.PhoneNumber,
                Email = newBranchEntity.Email,
            },
            Username = newMemberEntity.Username,
            Email = newMemberEntity.Email,

        };

        var claims = new List<Claim>
            {
                new Claim("Uuid", accountModel.Uuid.ToString()),
                new Claim("PartnerUuid", accountModel.Partner.Uuid.ToString())
            };
        claims.AddRange(accountModel.Role.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

        var accessToken = _AccessTokenHelper.Generate(claims);

        return new ClsAccountModel<ClsMemberAccountModel>
        {
            Account = accountModel,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
    public async Task<ClsAccountModel<ClsMemberAccountModel>> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        var member = await _AppDBContext.Members
        .AsNoTracking()
        .Where(member =>
            member.Email == credentials.Email &&
            member.Status == STATUS.ACTIVE &&
            !member.IsDeleted
        )
        .Select(member => new
        {
            Account = new ClsMemberAccountModel
            {
                Uuid = member.Uuid,
                Partner = new ClsMemberAccountModel.ClsPartnerModel
                {
                    Uuid = member.Partner.Uuid,
                    Logo = member.Partner.Logo == null ? null : new ClsImageModel
                    {
                        Id = member.Partner.Logo.Id,
                        Url = member.Partner.Logo.Url,
                    },
                    Banner = member.Partner.Banner == null ? null : new ClsImageModel
                    {
                        Id = member.Partner.Banner.Id,
                        Url = member.Partner.Banner.Url,
                    },
                    Handle = member.Partner.Handle,
                    OrganizationName = member.Partner.OrganizationName,
                    PhoneNumber = member.Partner.PhoneNumber,
                    Email = member.Partner.Email,
                },
                Role = new ClsMemberAccountModel.ClsRoleModel
                {
                    Name = member.Role.Role.Name,
                    Permissions = _AppDBContext.RolePermissions
                    .AsNoTracking()
                    .Where(rolePermission => rolePermission.RoleUuid == member.Role.RoleUuid)
                    .Select(rolePermission => rolePermission.Permission.Type)
                    .ToArray()
                },
                Avatar = member.Avatar == null ? null : new ClsImageModel
                {
                    Id = member.Avatar.Id,
                    Url = member.Avatar.Url,
                },
                Branch = new ClsMemberAccountModel.ClsBranchModel
                {
                    Location = new ClsMemberAccountModel.ClsBranchModel.ClsLocationModel
                    {
                        Country = member.Branch.Location.Country,
                        City = member.Branch.Location.City,
                        Street = member.Branch.Location.Street,
                        Latitude = member.Branch.Location.Latitude,
                        Longitude = member.Branch.Location.Longitude,
                    },
                    Name = member.Branch.Name,
                    PhoneNumber = member.Branch.PhoneNumber,
                    Email = member.Branch.Email,
                },
                Username = member.Username,
                Email = member.Email,
            },
            Password = member.Password
        })
        .FirstAsync();

        var isValidPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, member.Password, credentials.Password);
        if (isValidPassword == PasswordVerificationResult.Failed) throw new ArgumentException("Invalid password");
        if (isValidPassword == PasswordVerificationResult.SuccessRehashNeeded)
        {
            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);

            await _AppDBContext.Members
            .Where(member =>
                member.Email == credentials.Email &&
                member.Status == STATUS.ACTIVE &&
                !member.IsDeleted
            )
            .ExecuteUpdateAsync(member => member.SetProperty(member => member.Password, hashedPassword));
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
        var newMemberRefreshTokenEntity = new ClsMemberRefreshTokenEntity
        {
            Uuid = Guid.NewGuid(),
            MemberUuid = member.Account.Uuid,
            RefreshTokenUuid = newRefreshTokenEntity.Uuid,
        };

        _AppDBContext.RefreshTokens.Add(newRefreshTokenEntity);
        _AppDBContext.MemberRefreshTokens.Add(newMemberRefreshTokenEntity);

        await _AppDBContext.SaveChangesAsync();

        var claims = new List<Claim>
        {
            new Claim("Uuid", member.Account.Uuid.ToString()),
            new Claim("PartnerUuid", member.Account.Partner.Uuid.ToString())
        };
        claims.AddRange(member.Account.Role.Permissions.Select(permission => new Claim("Permissions", permission.ToString())));

        var accessToken = _AccessTokenHelper.Generate(claims);

        return new ClsAccountModel<ClsMemberAccountModel>
        {
            Account = member.Account,
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }
}
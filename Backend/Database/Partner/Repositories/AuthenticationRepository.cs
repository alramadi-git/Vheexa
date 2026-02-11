using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using Database.Entities;

using Database.Enums;

using Database.Inputs;
using Database.Partner.Inputs;

using Database.Partner.Models;

namespace Database.Partner.Repositories;

public class ClsAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsMemberAccountModel> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newLogo = credentials.Logo == null ? null : new ClsImageEntity
            {
                Id = credentials.Logo.Id,
                Url = credentials.Logo.Url,
            };
            var newBanner = credentials.Banner == null ? null : new ClsImageEntity
            {
                Id = credentials.Banner.Id,
                Url = credentials.Banner.Url,
            };

            var newPartner = new ClsPartnerEntity
            {
                Uuid = credentials.Uuid,
                LogoId = newLogo?.Id,
                BannerId = newBanner?.Id,
                Handle = credentials.Handle,
                OrganizationName = credentials.OrganizationName,
                PhoneNumber = credentials.PhoneNumber,
                Email = credentials.Email,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            var newLocation = new ClsLocationEntity
            {
                Uuid = Guid.NewGuid(),
                Country = credentials.Branch.Location.Country,
                City = credentials.Branch.Location.City,
                Street = credentials.Branch.Location.Street,
                Latitude = credentials.Branch.Location.Latitude,
                Longitude = credentials.Branch.Location.Longitude,
            };
            var newBranch = new ClsBranchEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = newPartner.Uuid,
                LocationUuid = newLocation.Uuid,
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
            .AsNoTracking()
            .Where(role =>
                role.IsDefault &&
                !role.IsAdmin
            )
            .ToArrayAsync();

            var ownerRoleUuid = new Guid("8d5df272-e00a-4fc4-89a5-f0b6028bb7c0");
            var newPartnerRoles = defaultRoles
            .Select(role => new ClsPartnerRoleEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = newPartner.Uuid,
                RoleUuid = role.Uuid,
                AssignedCount = 0,
                Status = STATUS.ACTIVE,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            }).ToArray();

            var partnerRole = newPartnerRoles.First(role => role.RoleUuid == ownerRoleUuid);
            partnerRole.AssignedCount = 1;

            var newAvatar = credentials.Member.Avatar == null ? null : new ClsImageEntity
            {
                Id = credentials.Member.Avatar.Id,
                Url = credentials.Member.Avatar.Url,
            };

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Member.Password);
            var newMember = new ClsMemberEntity
            {
                Uuid = credentials.Member.Uuid,
                PartnerUuid = newPartner.Uuid,
                RoleUuid = partnerRole.Uuid,
                BranchUuid = newBranch.Uuid,
                AvatarId = newAvatar?.Id,
                Username = credentials.Member.Username,
                Email = credentials.Member.Email,
                Password = hashedPassword,
                Status = STATUS.ACTIVE,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            if (newLogo != null) _AppDBContext.Images.Add(newLogo);
            if (newBanner != null) _AppDBContext.Images.Add(newBanner);
            _AppDBContext.Partners.Add(newPartner);

            _AppDBContext.Locations.Add(newLocation);
            _AppDBContext.Branches.Add(newBranch);

            _AppDBContext.PartnerRoles.AddRange(newPartnerRoles);

            if (newAvatar != null) _AppDBContext.Images.Add(newAvatar);
            _AppDBContext.Members.Add(newMember);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var permissions = await _AppDBContext.RolePermissions
            .AsNoTracking()
            .Where(rolePermission => rolePermission.RoleUuid == newMember.Role.RoleUuid)
            .Select(rolePermission => rolePermission.Permission.Type)
            .ToArrayAsync();

            var accountDto = new ClsMemberAccountModel
            {
                Partner = new ClsMemberAccountModel.ClsPartnerModel
                {
                    Logo = newPartner.Logo == null ? null : new Database.Models.ClsImageModel
                    {
                        Id = newPartner.Logo.Id,
                        Url = newPartner.Logo.Url,
                    },
                    Banner = newPartner.Banner == null ? null : new Database.Models.ClsImageModel
                    {
                        Id = newPartner.Banner.Id,
                        Url = newPartner.Banner.Url,
                    },
                    Handle = newPartner.Handle,
                    OrganizationName = newPartner.OrganizationName,
                    PhoneNumber = newPartner.PhoneNumber,
                    Email = newPartner.Email,
                },
                Role =
                {
                    Name = newMember.Role.Role.Name,
                    Permissions = permissions
                },
                Avatar = newMember.Avatar == null ? null : new Database.Models.ClsImageModel
                {
                    Id = newMember.Avatar.Id,
                    Url = newMember.Avatar.Url,
                },
                Branch = new ClsMemberAccountModel.ClsBranchModel
                {
                    Location = new ClsMemberAccountModel.ClsBranchModel.ClsLocationModel
                    {
                        Country = newLocation.Country,
                        City = newLocation.City,
                        Street = newLocation.Street,
                        Latitude = newLocation.Latitude,
                        Longitude = newLocation.Longitude,
                    },
                    Name = newBranch.Name,
                    PhoneNumber = newBranch.PhoneNumber,
                    Email = newBranch.Email,
                },
                Username = newMember.Username,
                Email = newMember.Email,

            };

            return accountDto;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<ClsMemberAccountModel> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        var member = await _AppDBContext.Members
        .AsNoTracking()
        .Include(member => member.Partner)
        .Include(member => member.Role).ThenInclude(partnerRole => partnerRole.Role)
        .Include(member => member.Branch).ThenInclude(branch => branch.Location)
        .Where(member => member.Email == credentials.Email)
        .FirstAsync();

        var hashPassword = new PasswordHasher<object?>().VerifyHashedPassword(null, member.Password, credentials.Password);
        if (hashPassword != PasswordVerificationResult.Success) throw new ArgumentException("Invalid password");
        if (hashPassword != PasswordVerificationResult.SuccessRehashNeeded)
        {
            var trackedMember = await _AppDBContext.Members
            .Where(member => member.Email == credentials.Email)
            .FirstAsync();

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Password);
            trackedMember.Password = hashedPassword;

            await _AppDBContext.SaveChangesAsync();
        }

        var permissions = await _AppDBContext.RolePermissions
        .AsNoTracking()
        .Where(rolePermission => rolePermission.RoleUuid == member.Role.RoleUuid)
        .Select(rolePermission => rolePermission.Permission.Type)
        .ToArrayAsync();

        var accountDto = new ClsMemberAccountModel
        {
            Partner = new ClsMemberAccountModel.ClsPartnerModel
            {
                Logo = member.Partner.Logo == null ? null : new Database.Models.ClsImageModel
                {
                    Id = member.Partner.Logo.Id,
                    Url = member.Partner.Logo.Url,
                },
                Banner = member.Partner.Banner == null ? null : new Database.Models.ClsImageModel
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
                Permissions = permissions
            },
            Avatar = member.Avatar == null ? null : new Database.Models.ClsImageModel
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
        };

        return accountDto;
    }
}
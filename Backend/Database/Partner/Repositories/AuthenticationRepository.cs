using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using Database.Enums;
using Database.Partner.Enums;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Entities;

using Database.Partner.Dtos;

namespace Database.Partner.Repositories;

public class ClsAuthenticationRepository
{
    private static readonly Dictionary<Guid, PERMISSION> PermissionUuidsMap = new()
    {
        { new Guid("d3b2f1a4-7c6e-4a8d-b5c9-123456789abc"), PERMISSION.PARTNER_READ},
        { new Guid("e4c3g2b5-8d7f-5b9e-c6da-23456789abcd"), PERMISSION.PARTNER_UPDATE},
        { new Guid("f5d4h3c6-9e8g-6c0f-d7eb-3456789abcde"), PERMISSION.PARTNER_DELETE},
        { new Guid("a6e5i4d7-0f9h-7d1g-e8fc-456789abcdef"), PERMISSION.ROLES_CREATE},
        { new Guid("b7f6j5e8-1g0i-8e2h-f9gd-56789abcdef0"), PERMISSION.ROLES_READ},
        { new Guid("c8g7k6f9-2h1j-9f3i-g0he-6789abcdef01"), PERMISSION.ROLES_UPDATE},
        { new Guid("d9h8l7g0-3i2k-0g4j-h1if-789abcdef012"), PERMISSION.ROLES_DELETE},
        { new Guid("e0i9m8h1-4j3l-1h5k-i2jg-89abcdef0123"), PERMISSION.BRANCHES_CREATE},
        { new Guid("f1j0n9i2-5k4m-2i6l-j3kh-9abcdef01234"), PERMISSION.BRANCHES_READ},
        { new Guid("g2k1o0j3-6l5n-3j7m-k4li-abcdef012345"), PERMISSION.BRANCHES_UPDATE},
        { new Guid("h3l2p1k4-7m6o-4k8n-l5mj-bcdef0123456"), PERMISSION.BRANCHES_DELETE},
        { new Guid("i4m3q2l5-8n7p-5l9o-m6nk-cdef01234567"), PERMISSION.MEMBERS_CREATE},
        { new Guid("j5n4r3m6-9o8q-6m0p-n7ol-def012345678"), PERMISSION.MEMBERS_READ},
        { new Guid("k6o5s4n7-0p9r-7n1q-o8pm-ef0123456789"), PERMISSION.MEMBERS_UPDATE},
        { new Guid("l7p6t5o8-1q0s-8o2r-p9qn-f0123456789a"), PERMISSION.MEMBERS_DELETE},
        { new Guid("m8q7u6p9-2r1t-9p3s-q0ro-0123456789ab"), PERMISSION.VEHICLE_MODELS_CREATE},
        { new Guid("n9r8v7q0-3s2u-0q4t-r1sp-123456789abc"), PERMISSION.VEHICLE_MODELS_READ},
        { new Guid("o0s9w8r1-4t3v-1r5u-s2tq-23456789abcd"), PERMISSION.VEHICLE_MODELS_UPDATE},
        { new Guid("p1t0x9s2-5u4w-2s6v-t3ur-3456789abcde"), PERMISSION.VEHICLE_MODELS_DELETE}
    };
    private readonly AppDBContext _AppDBContext;

    public ClsAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsAccountDto> RegisterAsync(ClsRegisterCredentialsParameter credentials)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newPartner = new ClsPartnerEntity
            {
                Uuid = Guid.NewGuid(),
                Banner = credentials.Banner,
                Logo = credentials.Logo,
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

            var partnerRole = newPartnerRoles.First(role => role.RoleUuid == new Guid("e1d4a7a3-4b9f-4b4b-9c9c-4a9b4a9b4a9b"));
            partnerRole.AssignedCount = 1;

            var hashPassword = new PasswordHasher<object?>().HashPassword(null, credentials.Member.Password);
            var newMember = new ClsMemberEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = newPartner.Uuid,
                RoleUuid = partnerRole.Uuid,
                BranchUuid = newBranch.Uuid,
                Avatar = credentials.Member.Avatar,
                Username = credentials.Member.Username,
                Email = credentials.Member.Email,
                Password = hashPassword,
                Status = STATUS.ACTIVE,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            _AppDBContext.Partners.Add(newPartner);

            _AppDBContext.Locations.Add(newLocation);
            _AppDBContext.Branches.Add(newBranch);

            _AppDBContext.PartnerRoles.AddRange(newPartnerRoles);

            _AppDBContext.Members.Add(newMember);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();

            var permissionUuids = await _AppDBContext.RolePermissions
            .AsNoTracking()
            .Where(rolePermission => rolePermission.RoleUuid == newMember.Role.RoleUuid)
            .Select(rolePermission => rolePermission.PermissionUuid)
            .ToArrayAsync();

            var accountDto = new ClsAccountDto
            {
                Partner = new ClsAccountDto.ClsPartnerDto
                {
                    Banner = newPartner.Banner,
                    Logo = newPartner.Logo,
                    Handle = newPartner.Handle,
                    OrganizationName = newPartner.OrganizationName,
                    PhoneNumber = newPartner.PhoneNumber,
                    Email = newPartner.Email,
                },
                Role =
                {
                    Name = newMember.Role.Role.Name,
                    Permissions = permissionUuids
                    .Select(permissionUuid => PermissionUuidsMap[permissionUuid])
                    .ToArray(),
                },
                Avatar = newMember.Avatar,
                Branch = new ClsAccountDto.ClsBranchDto
                {
                    Location = new ClsAccountDto.ClsBranchDto.ClsLocationDto
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
    public async Task<ClsAccountDto> LoginAsync(ClsLoginCredentialsParameter credentials)
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

        var permissionUuids = await _AppDBContext.RolePermissions
        .AsNoTracking()
        .Where(rolePermission => rolePermission.RoleUuid == member.Role.RoleUuid)
        .Select(rolePermission => rolePermission.PermissionUuid)
        .ToArrayAsync();

        var accountDto = new ClsAccountDto
        {
            Partner = new ClsAccountDto.ClsPartnerDto
            {
                Banner = member.Partner.Banner,
                Logo = member.Partner.Logo,
                Handle = member.Partner.Handle,
                OrganizationName = member.Partner.OrganizationName,
                PhoneNumber = member.Partner.PhoneNumber,
                Email = member.Partner.Email,
            },
            Role = new ClsAccountDto.ClsRoleDto
            {
                Name = member.Role.Role.Name,
                Permissions = permissionUuids
                .Select(permissionUuid => PermissionUuidsMap[permissionUuid])
                .ToArray(),
            },
            Avatar = member.Avatar,
            Branch = new ClsAccountDto.ClsBranchDto
            {
                Location = new ClsAccountDto.ClsBranchDto.ClsLocationDto
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
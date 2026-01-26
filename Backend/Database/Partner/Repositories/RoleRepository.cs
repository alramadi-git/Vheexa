using Microsoft.EntityFrameworkCore;

using Database.Entities;

using Database.Partner.Enums;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Partner.Contexts;

namespace Database.Partner.Repositories;

public class ClsRoleRepository
{
    private static readonly Dictionary<PERMISSION, Guid> PermissionsMap = new()
    {
        { PERMISSION.PARTNER_READ, new Guid("d3b2f1a4-7c6e-4a8d-b5c9-123456789abc") },
        { PERMISSION.PARTNER_UPDATE, new Guid("e4c3g2b5-8d7f-5b9e-c6da-23456789abcd") },
        { PERMISSION.PARTNER_DELETE, new Guid("f5d4h3c6-9e8g-6c0f-d7eb-3456789abcde") },
        { PERMISSION.ROLES_CREATE, new Guid("a6e5i4d7-0f9h-7d1g-e8fc-456789abcdef") },
        { PERMISSION.ROLES_READ, new Guid("b7f6j5e8-1g0i-8e2h-f9gd-56789abcdef0") },
        { PERMISSION.ROLES_UPDATE, new Guid("c8g7k6f9-2h1j-9f3i-g0he-6789abcdef01") },
        { PERMISSION.ROLES_DELETE, new Guid("d9h8l7g0-3i2k-0g4j-h1if-789abcdef012") },
        { PERMISSION.BRANCHES_CREATE, new Guid("e0i9m8h1-4j3l-1h5k-i2jg-89abcdef0123") },
        { PERMISSION.BRANCHES_READ, new Guid("f1j0n9i2-5k4m-2i6l-j3kh-9abcdef01234") },
        { PERMISSION.BRANCHES_UPDATE, new Guid("g2k1o0j3-6l5n-3j7m-k4li-abcdef012345") },
        { PERMISSION.BRANCHES_DELETE, new Guid("h3l2p1k4-7m6o-4k8n-l5mj-bcdef0123456") },
        { PERMISSION.MEMBERS_CREATE, new Guid("i4m3q2l5-8n7p-5l9o-m6nk-cdef01234567") },
        { PERMISSION.MEMBERS_READ, new Guid("j5n4r3m6-9o8q-6m0p-n7ol-def012345678") },
        { PERMISSION.MEMBERS_UPDATE, new Guid("k6o5s4n7-0p9r-7n1q-o8pm-ef0123456789") },
        { PERMISSION.MEMBERS_DELETE, new Guid("l7p6t5o8-1q0s-8o2r-p9qn-f0123456789a") },
        { PERMISSION.VEHICLE_MODELS_CREATE, new Guid("m8q7u6p9-2r1t-9p3s-q0ro-0123456789ab") },
        { PERMISSION.VEHICLE_MODELS_READ, new Guid("n9r8v7q0-3s2u-0q4t-r1sp-123456789abc") },
        { PERMISSION.VEHICLE_MODELS_UPDATE, new Guid("o0s9w8r1-4t3v-1r5u-s2tq-23456789abcd") },
        { PERMISSION.VEHICLE_MODELS_DELETE, new Guid("p1t0x9s2-5u4w-2s6v-t3ur-3456789abcde") }
    };
    private readonly AppDBContext _AppDBContext;

    public ClsRoleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsRoleCreateParameter role, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newRole = new ClsRoleEntity
            {
                Uuid = Guid.NewGuid(),
                Name = role.Name,
                IsDefault = false,
                IsAdmin = false,
            };
            var newPermissions = role.Permissions.Select(permission => new ClsRolePermissionEntity
            {
                Uuid = Guid.NewGuid(),
                RoleUuid = newRole.Uuid,
                PermissionUuid = PermissionsMap[permission],
            }).ToArray();
            var newPartnerRole = new ClsPartnerRoleEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = memberContext.PartnerUuid,
                RoleUuid = newRole.Uuid,
                AssignedCount = 0,
                Status = (ClsPartnerRoleEntity.STATUS)role.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.CREATE,
                Entity = ClsHistoryEntity.ENTITY.PARTNER_ROLES,
                EntityUuid = newPartnerRole.Uuid,
            };
            var newMemberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = newHistory.Uuid,
                MemberUuid = memberContext.Uuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Roles.Add(newRole);
            _AppDBContext.RolePermissions.AddRange(newPermissions);
            _AppDBContext.PartnerRoles.Add(newPartnerRole);

            _AppDBContext.Histories.Add(newHistory);
            _AppDBContext.MemberHistories.Add(newMemberHistory);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<ClsRoleDto> ReadOneAsync(Guid roleUuid, ClsMemberContext memberContext)
    {
        var role = await _AppDBContext.PartnerRoles
        .Where(partnerRole =>
            partnerRole.Uuid == roleUuid &&
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(partnerRole => new ClsRoleDto
        {
            Uuid = partnerRole.Uuid,
            Name = partnerRole.Role.Name,
            Permissions = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == partnerRole.RoleUuid)
            .Select(rolePermission => new ClsRoleDto.ClsPermissionDto
            {
                Uuid = rolePermission.PermissionUuid,
                Name = rolePermission.Permission.Name
            })
            .ToArray(),
            AssignedCount = partnerRole.AssignedCount,
            Status = (ClsRoleDto.STATUS)partnerRole.Status,
            CreatedAt = partnerRole.CreatedAt,
            UpdatedAt = partnerRole.UpdatedAt,
        })
        .SingleAsync();

        return role;
    }
    public async Task<ClsPaginatedDto<ClsRoleDto>> ReadManyAsync(ClsRoleFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var roles = _AppDBContext.PartnerRoles
        .Where(partnerRole =>
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        );

        if (filter.Name != null) roles = roles.Where(partnerRole => partnerRole.Role.Name.ToLower().Contains(filter.Name.ToLower()));
        if (filter.Status != null) roles = roles.Where(partnerRole => partnerRole.Status == (ClsPartnerRoleEntity.STATUS)filter.Status);

        var mappedPermissions = filter.Permissions.Select(permission => PermissionsMap[permission]).ToArray();
        if (mappedPermissions.Length > 0) roles = roles.Where(partnerRole => _AppDBContext.RolePermissions.Any(rolePermission =>
            rolePermission.RoleUuid == partnerRole.RoleUuid &&
            mappedPermissions.Contains(rolePermission.PermissionUuid)
        ));

        var count = await roles.CountAsync();

        roles = roles
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize);

        var roleDtos = roles.Select(partnerRole => new ClsRoleDto
        {
            Uuid = partnerRole.Uuid,
            Name = partnerRole.Role.Name,
            Permissions = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == partnerRole.RoleUuid)
            .Select(rolePermission => new ClsRoleDto.ClsPermissionDto
            {
                Uuid = rolePermission.PermissionUuid,
                Name = rolePermission.Permission.Name
            }).ToArray(),
            AssignedCount = partnerRole.AssignedCount,
            Status = (ClsRoleDto.STATUS)partnerRole.Status,
            CreatedAt = partnerRole.CreatedAt,
            UpdatedAt = partnerRole.UpdatedAt,
        });

        return new ClsPaginatedDto<ClsRoleDto>(
            await roleDtos.ToArrayAsync(),
            new ClsPaginatedDto<ClsRoleDto>.ClsPaginationDto(pagination.Page, pagination.PageSize, count)
        );
    }
    public async Task DeleteOneAsync(Guid roleUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var role = await _AppDBContext.PartnerRoles
            .Where(partnerRole =>
                partnerRole.Uuid == roleUuid &&
                partnerRole.PartnerUuid == memberContext.PartnerUuid &&
                !partnerRole.IsDeleted
            )
            .SingleAsync();
            role.UpdatedAt = DateTime.UtcNow;
            role.IsDeleted = true;
            role.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.DELETE,
                Entity = ClsHistoryEntity.ENTITY.PARTNER_ROLES,
                EntityUuid = roleUuid,

            };
            var newMemberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = newHistory.Uuid,
                MemberUuid = memberContext.Uuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Histories.Add(newHistory);
            _AppDBContext.MemberHistories.Add(newMemberHistory);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
};
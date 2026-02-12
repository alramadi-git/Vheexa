using Microsoft.EntityFrameworkCore;

using FuzzySharp;

using Database.Entities;

using Database.Enums;
using Database.Partner.Enums;

using Database.Filters;
using Database.Partner.Filters;

using Database.Partner.Inputs;

using Database.Partner.Contexts;

using Database.Models;
using Database.Partner.Models;

namespace Database.Partner.Repositories;

public class ClsRoleRepository
{
    private static readonly Dictionary<PERMISSION, Guid> PermissionsMap = new()
    {
        { PERMISSION.PARTNER_READ, new Guid("dfdbf9b2-b7c7-43bc-8911-0ac1f3ab340b") },
        { PERMISSION.PARTNER_UPDATE, new Guid("55662026-8286-4566-8c95-30de9f9cb13e") },
        { PERMISSION.PARTNER_DELETE, new Guid("d9404cc5-4a67-4433-aec1-57a7dbd0eb48") },
        { PERMISSION.ROLES_CREATE, new Guid("57c81c15-4092-49f3-9c14-a65b1b558ff6") },
        { PERMISSION.ROLES_READ, new Guid("0cdb4614-ada9-40a3-bbe6-39608af357b7") },
        { PERMISSION.ROLES_UPDATE, new Guid("b42a9e6c-e66a-48b3-9de8-9bdc43a1f6a8") },
        { PERMISSION.ROLES_DELETE, new Guid("3918479a-a73d-4a9a-bdfa-76a3bcdd9b07") },
        { PERMISSION.BRANCHES_CREATE, new Guid("9f524606-f2fb-4d9f-b121-df52cff42fb9") },
        { PERMISSION.BRANCHES_READ, new Guid("9ceeb1d8-3348-41e6-a4a0-c5a50efe4f0a") },
        { PERMISSION.BRANCHES_UPDATE, new Guid("86c89f2b-18ca-47c9-8f07-c5c34d6a1682") },
        { PERMISSION.BRANCHES_DELETE, new Guid("8a9e7122-6cdf-4652-a4ef-5ad88248d61f") },
        { PERMISSION.MEMBERS_CREATE, new Guid("1fca3d0f-bd4f-4f95-8a4a-52142e1887ab") },
        { PERMISSION.MEMBERS_READ, new Guid("4ebbf4c4-89c1-4c0a-a45c-193a0ef5d3ae") },
        { PERMISSION.MEMBERS_UPDATE, new Guid("4d2da27f-6e60-4794-ac8d-ace63987c44f") },
        { PERMISSION.MEMBERS_DELETE, new Guid("684a4492-3216-4298-b98b-83359f0f0280") },
        { PERMISSION.VEHICLE_MODELS_CREATE, new Guid("cfff27e5-0e9f-492e-b0c2-14009781e589") },
        { PERMISSION.VEHICLE_MODELS_READ, new Guid("987dd5dd-1a1b-4d4f-8392-859f9a9e6656") },
        { PERMISSION.VEHICLE_MODELS_UPDATE, new Guid("d8b092d3-8cb2-418d-8b00-30c23735b708") },
        { PERMISSION.VEHICLE_MODELS_DELETE, new Guid("121bb695-28ed-426f-abcf-eabc44ee3447") }
    };

    private readonly AppDBContext _AppDBContext;

    public ClsRoleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsRoleInput role, ClsMemberContext memberContext)
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
                Status = role.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.CREATE,
                Entity = HISTORY_ENTITY.PARTNER_ROLES,
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
    public async Task DeleteOneAsync(Guid roleUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var partnerRole = await _AppDBContext.PartnerRoles
            .Where(partnerRole =>
                partnerRole.Uuid == roleUuid &&
                partnerRole.PartnerUuid == memberContext.PartnerUuid &&
                !partnerRole.IsDeleted
            )
            .FirstAsync();

            if (partnerRole.Role.IsDefault) throw new ArgumentException("Cannot delete system role");
            if (partnerRole.AssignedCount > 0) throw new ArgumentException("Cannot delete role with assigned members");

            partnerRole.UpdatedAt = DateTime.UtcNow;
            partnerRole.IsDeleted = true;
            partnerRole.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.DELETE,
                Entity = HISTORY_ENTITY.PARTNER_ROLES,
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
    public async Task<ClsPaginatedModel<ClsRoleModel>> SearchAsync(ClsRoleFilter filter, ClsPaginationFilter pagination, ClsMemberContext memberContext)
    {
        var rolesQuery = _AppDBContext.PartnerRoles
        .AsNoTracking()
        .Where(partnerRole =>
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        );

        if (filter.Permissions.Length > 0)
        {
            rolesQuery = rolesQuery
            .Where(partnerRole => _AppDBContext.RolePermissions
                .Any(rolePermission =>
                    rolePermission.RoleUuid == partnerRole.RoleUuid &&
                    filter.Permissions.Contains(rolePermission.Permission.Type)
                )
            );
        }

        if (filter.Status != null) rolesQuery = rolesQuery.Where(partnerRole => partnerRole.Status == filter.Status);

        var roles = await rolesQuery
        .Select(partnerRole => new ClsRoleModel
        {
            Uuid = partnerRole.Uuid,
            Name = partnerRole.Role.Name,
            Permissions = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == partnerRole.RoleUuid)
            .Select(rolePermission => rolePermission.Permission.Type)
            .ToArray(),
            AssignedCount = partnerRole.AssignedCount,
            Status = partnerRole.Status,
            CreatedAt = partnerRole.CreatedAt,
            UpdatedAt = partnerRole.UpdatedAt,
        })
        .ToArrayAsync();

        if (filter.Name != null)
        {
            roles = roles
            .Select(roleDto => new
            {
                RoleDto = roleDto,
                Score = Fuzz.Ratio(roleDto.Name, filter.Name)
            })
            .Where(fuzzyRoleDto => fuzzyRoleDto.Score > 20)
            .OrderByDescending(fuzzyRoleDto => fuzzyRoleDto.Score)
            .Select(fuzzyRoleDto => fuzzyRoleDto.RoleDto)
            .ToArray();
        }

        var totalItems = roles.Length;

        roles = roles
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        return new ClsPaginatedModel<ClsRoleModel>
        {
            Data = roles,
            Pagination = new ClsPaginatedModel<ClsRoleModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
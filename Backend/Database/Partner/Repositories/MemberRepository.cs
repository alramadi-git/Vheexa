using Microsoft.EntityFrameworkCore;

using Database.Enums;

using Database.Entities;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Partner.Contexts;

namespace Database.Partner.Repositories;

public class ClsMemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsMemberCreateParameter member, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var roleTask = await _AppDBContext.PartnerRoles
            .AnyAsync(partnerRole =>
                partnerRole.Uuid == member.RoleUuid &&
                partnerRole.PartnerUuid == memberContext.PartnerUuid &&
                !partnerRole.IsDeleted

            );
            var branchTask = await _AppDBContext.Branches
            .AnyAsync(branch =>
                branch.Uuid == member.BranchUuid &&
                branch.PartnerUuid == memberContext.PartnerUuid &&
                !branch.IsDeleted

            );

            if (!roleTask || !branchTask) throw new ArgumentException("Invalid (role or branch) uuid");

            var newMember = new ClsMemberEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = memberContext.PartnerUuid,
                Avatar = member.Avatar,
                RoleUuid = member.RoleUuid,
                BranchUuid = member.BranchUuid,
                Username = member.Username,
                Email = member.Email,
                Password = member.Password,
                Status = member.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.CREATE,
                Entity = HISTORY_ENTITY.MEMBERS,
                EntityUuid = newMember.Uuid,
            };
            var newMemberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = newHistory.Uuid,
                MemberUuid = memberContext.Uuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Members.Add(newMember);

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
    public async Task<ClsMemberDto> ReadOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        var member = await _AppDBContext.Members
        .Where(partnerMember =>
            partnerMember.Uuid == memberUuid &&
            partnerMember.PartnerUuid == memberContext.PartnerUuid &&
            !partnerMember.IsDeleted
        )
        .Select(member => new ClsMemberDto
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new ClsMemberDto.ClsRoleDto
            {
                Name = member.Role.Role.Name,
                Permissions = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == member.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Name)
                .ToArray()
            },
            Branch = new ClsMemberDto.ClsBranchDto
            {
                Location = new ClsMemberDto.ClsBranchDto.ClsLocationDto
                {
                    Country = member.Branch.Location.Country,
                    City = member.Branch.Location.City,
                    Street = member.Branch.Location.Street,
                    Latitude = member.Branch.Location.Latitude,
                    Longitude = member.Branch.Location.Longitude
                },
                Name = member.Branch.Name,
                PhoneNumber = member.Branch.PhoneNumber,
                Email = member.Branch.Email,
            },
            Username = member.Username,
            Email = member.Email,
            Status = member.Status,
            CreatedAt = member.CreatedAt,
            UpdatedAt = member.UpdatedAt,
        })
        .SingleAsync();

        return member;
    }
    public async Task<ClsPaginatedDto<ClsMemberDto>> ReadManyAsync(ClsMemberFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var members = _AppDBContext.Members
        .Where(partnerMember =>
            partnerMember.PartnerUuid == memberContext.PartnerUuid &&
            !partnerMember.IsDeleted
        );

        if (filter.Search != null) members = members.Where(partnerMember =>
            partnerMember.Username.ToLower().Contains(filter.Search.ToLower()) ||
            partnerMember.Email.ToLower().Contains(filter.Search.ToLower())
        );

        if (filter.Roles.Length > 0) members = members.Where(member => filter.Roles.Contains(member.RoleUuid));
        if (filter.Branches.Length > 0) members = members.Where(member => filter.Branches.Contains(member.BranchUuid));

        if (filter.Status != null) members = members.Where(partnerMember => partnerMember.Status == filter.Status);

        var count = await members.CountAsync();

        members = members
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize);

        var memberDtos = members
        .Select(member => new ClsMemberDto
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new ClsMemberDto.ClsRoleDto
            {
                Name = member.Role.Role.Name,
                Permissions = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == member.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Name)
                .ToArray()
            },
            Branch = new ClsMemberDto.ClsBranchDto
            {
                Location = new ClsMemberDto.ClsBranchDto.ClsLocationDto
                {
                    Country = member.Branch.Location.Country,
                    City = member.Branch.Location.City,
                    Street = member.Branch.Location.Street,
                    Latitude = member.Branch.Location.Latitude,
                    Longitude = member.Branch.Location.Longitude
                },
                Name = member.Branch.Name,
                PhoneNumber = member.Branch.PhoneNumber,
                Email = member.Branch.Email,
            },
            Username = member.Username,
            Email = member.Email,
            Status = member.Status,
            CreatedAt = member.CreatedAt,
            UpdatedAt = member.UpdatedAt,
        });

        return new ClsPaginatedDto<ClsMemberDto>(
            await memberDtos.ToArrayAsync(),
            new ClsPaginatedDto<ClsMemberDto>.ClsPaginationDto(pagination.Page, pagination.PageSize, count)
        );
    }
    public async Task DeleteOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var member = await _AppDBContext.Members
            .Where(partnerMember =>
                partnerMember.Uuid == memberUuid &&
                partnerMember.PartnerUuid == memberContext.PartnerUuid &&
                !partnerMember.IsDeleted
            )
            .SingleAsync();
            member.UpdatedAt = DateTime.UtcNow;
            member.IsDeleted = true;
            member.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.DELETE,
                Entity = HISTORY_ENTITY.MEMBERS,
                EntityUuid = memberUuid,

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
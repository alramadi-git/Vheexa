using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using FuzzySharp;

using Database.Partner.Contexts;
using Database.Enums;

using Database.Entities;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

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
            var isRoleExist = await _AppDBContext.PartnerRoles
            .AnyAsync(partnerRole =>
                partnerRole.Uuid == member.RoleUuid &&
                partnerRole.PartnerUuid == memberContext.PartnerUuid &&
                !partnerRole.IsDeleted

            );
            var isBranchExist = await _AppDBContext.Branches
            .AnyAsync(branch =>
                branch.Uuid == member.BranchUuid &&
                branch.PartnerUuid == memberContext.PartnerUuid &&
                !branch.IsDeleted

            );

            if (!isRoleExist || !isBranchExist) throw new ArgumentException("Invalid (role or branch) uuid");

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, member.Password);
            var newMember = new ClsMemberEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = memberContext.PartnerUuid,
                Avatar = member.Avatar,
                RoleUuid = member.RoleUuid,
                BranchUuid = member.BranchUuid,
                Username = member.Username,
                Email = member.Email,
                Password = hashedPassword,
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
        var memberDto = await _AppDBContext.Members
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

        return memberDto;
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
    public async Task<ClsOptionDto[]> ReadRolesAsync(Guid[] uuids, ClsMemberContext memberContext)
    {
        var roleOptionDtos = await _AppDBContext.PartnerRoles
        .Where(partnerRole =>
            uuids.Contains(partnerRole.Uuid) &&
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(partnerRole => new ClsOptionDto
        {
            Uuid = partnerRole.Uuid,
            Name = partnerRole.Role.Name
        })
        .ToArrayAsync();

        return roleOptionDtos;
    }
    public async Task<ClsOptionDto[]> ReadBranchesAsync(Guid[] uuids, ClsMemberContext memberContext)
    {
        var branchOptionDto = await _AppDBContext.Branches
        .Where(branch =>
            uuids.Contains(branch.Uuid) &&
            branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsOptionDto
        {
            Uuid = branch.Uuid,
            Name = branch.Name
        })
        .ToArrayAsync();

        return branchOptionDto;
    }
    public async Task<ClsPaginatedDto<ClsOptionDto>> SearchRolesAsync(ClsOptionFilterParameter filter, ClsOptionPaginationParameter pagination, ClsMemberContext memberContext)
    {
        var roleOptionDtos = await _AppDBContext.PartnerRoles
        .Where(partnerRole =>
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(role => new ClsOptionDto
        {
            Uuid = role.Uuid,
            Name = role.Role.Name
        })
        .ToArrayAsync();

        if (filter.Search != null) roleOptionDtos = roleOptionDtos
        .Select(roleOptionDto => new
        {
            RoleOptionDto = roleOptionDto,
            Score = Fuzz.Ratio(roleOptionDto.Name, filter.Search)
        })
        .Where(fuzzyRoleOptionDto => fuzzyRoleOptionDto.Score > 80)
        .OrderByDescending(fuzzyRoleOptionDto => fuzzyRoleOptionDto.Score)
        .Select(fuzzyRoleOptionDto => fuzzyRoleOptionDto.RoleOptionDto)
        .ToArray();

        var totalItems = roleOptionDtos.Length;

        roleOptionDtos = roleOptionDtos
        .Skip((pagination.Page - 1) * 5)
        .Take(5)
        .ToArray();

        return new ClsPaginatedDto<ClsOptionDto>
        {
            Data =roleOptionDtos,
            Pagination = new ClsPaginatedDto<ClsOptionDto>.ClsPaginationDto
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedDto<ClsOptionDto>> SearchBranchesAsync(ClsOptionFilterParameter filter, ClsOptionPaginationParameter pagination, ClsMemberContext memberContext)
    {
        var branchOptionDtos = await _AppDBContext.Branches
        .Where(branch =>
            branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsOptionDto
        {
            Uuid = branch.Uuid,
            Name = branch.Name
        })
        .ToArrayAsync();

        if (filter.Search != null) branchOptionDtos = branchOptionDtos
        .Select(branchOptionDto => new
        {
            BranchOptionDto = branchOptionDto,
            Score = Fuzz.Ratio(branchOptionDto.Name, filter.Search)
        })
        .Where(fuzzyBranchOptionDto => fuzzyBranchOptionDto.Score > 80)
        .OrderByDescending(fuzzyBranchOptionDto => fuzzyBranchOptionDto.Score)
        .Select(fuzzyBranchOptionDto => fuzzyBranchOptionDto.BranchOptionDto)
        .ToArray();

        var totalItems = branchOptionDtos.Length;

        branchOptionDtos = branchOptionDtos
        .Skip((pagination.Page - 1) * 5)
        .Take(5)
        .ToArray();

        return new ClsPaginatedDto<ClsOptionDto>
        {
            Data = branchOptionDtos,
            Pagination = new ClsPaginatedDto<ClsOptionDto>.ClsPaginationDto
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedDto<ClsMemberDto>> SearchAsync(ClsMemberFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var membersQuery = _AppDBContext.Members
        .Where(partnerMember =>
            partnerMember.PartnerUuid == memberContext.PartnerUuid &&
            !partnerMember.IsDeleted
        );

        if (filter.Roles.Length > 0) membersQuery = membersQuery.Where(member => filter.Roles.Contains(member.RoleUuid));
        if (filter.Branches.Length > 0) membersQuery = membersQuery.Where(member => filter.Branches.Contains(member.BranchUuid));

        if (filter.Status != null) membersQuery = membersQuery.Where(member => member.Status == filter.Status);

        var memberDtos = await membersQuery
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
        .ToArrayAsync();

        if (filter.Search != null) memberDtos = memberDtos
        .Select(memberDto => new
        {
            MemberDto = memberDto,
            Score = new int[]
            {
                Fuzz.Ratio(memberDto.Username, filter.Search),
                Fuzz.Ratio(memberDto.Email, filter.Search),
            }.Max()
        })
        .Where(fuzzyMemberDto => fuzzyMemberDto.Score > 80)
        .OrderByDescending(fuzzyMemberDto => fuzzyMemberDto.Score)
        .Select(fuzzyMemberDto => fuzzyMemberDto.MemberDto)
        .ToArray();

        var totalItems = memberDtos.Length;

        memberDtos = memberDtos
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        return new ClsPaginatedDto<ClsMemberDto>
        {
            Data = memberDtos,
            Pagination = new ClsPaginatedDto<ClsMemberDto>.ClsPaginationDto
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
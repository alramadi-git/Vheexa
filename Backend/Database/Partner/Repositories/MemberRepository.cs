using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using FuzzySharp;

using Database.Entities;

using Database.Enums;

using Database.Partner.Inputs;

using Database.Filters;
using Database.Partner.Filters;

using Database.Partner.Contexts;

using Database.Models;
using Database.Partner.Models;

namespace Database.Partner.Repositories;

public class ClsMemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsMemberInput member, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var isRoleExist = await _AppDBContext.PartnerRoles
            .AsNoTracking()
            .AnyAsync(partnerRole =>
                partnerRole.Uuid == member.RoleUuid &&
                partnerRole.PartnerUuid == memberContext.PartnerUuid &&
                !partnerRole.IsDeleted
            );
            var isBranchExist = await _AppDBContext.Branches
            .AsNoTracking()
            .AnyAsync(branch =>
                branch.Uuid == member.BranchUuid &&
                branch.PartnerUuid == memberContext.PartnerUuid &&
                !branch.IsDeleted
            );

            if (!isRoleExist || !isBranchExist) throw new ArgumentException("Invalid (role or branch) uuid");

            var newAvatar = member.Avatar == null ? null : new ClsImageEntity
            {
                Id = member.Avatar.Id,
                Url = member.Avatar.Url,
            };

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, member.Password);
            var newMember = new ClsMemberEntity
            {
                Uuid = member.Uuid,
                AvatarId = newAvatar?.Id,
                PartnerUuid = memberContext.PartnerUuid,
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

            if (newAvatar != null) _AppDBContext.Images.Add(newAvatar);
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
    public async Task<ClsOptionModel[]> ReadRolesAsync(Guid[] uuids, ClsMemberContext memberContext)
    {
        var roleOptions = await _AppDBContext.PartnerRoles
        .AsNoTracking()
        .Where(partnerRole =>
            uuids.Contains(partnerRole.Uuid) &&
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(partnerRole => new ClsOptionModel
        {
            Uuid = partnerRole.Uuid,
            Name = partnerRole.Role.Name
        })
        .ToArrayAsync();

        return roleOptions;
    }
    public async Task<ClsOptionModel[]> ReadBranchesAsync(Guid[] uuids, ClsMemberContext memberContext)
    {
        var branchOptions = await _AppDBContext.Branches
        .AsNoTracking()
        .Where(branch =>
            uuids.Contains(branch.Uuid) &&
            branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsOptionModel
        {
            Uuid = branch.Uuid,
            Name = branch.Name
        })
        .ToArrayAsync();

        return branchOptions;
    }
    public async Task DeleteOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var member = await _AppDBContext.Members
            .Include(member => member.Role)
            .Include(member => member.Branch)
            .Where(member =>
                member.Uuid == memberUuid &&
                member.PartnerUuid == memberContext.PartnerUuid &&
                !member.IsDeleted
            )
            .FirstAsync();
            member.Role.AssignedCount -= 1;
            member.Branch.MemberCount -= 1;

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
    public async Task<ClsPaginatedModel<ClsOptionModel>> SearchRolesAsync(ClsOptionFilter filter, ClsOptionPaginationFilter pagination, ClsMemberContext memberContext)
    {
        var roleOptions = await _AppDBContext.PartnerRoles
        .AsNoTracking()
        .Where(partnerRole =>
            partnerRole.PartnerUuid == memberContext.PartnerUuid &&
            !partnerRole.IsDeleted
        )
        .Select(role => new ClsOptionModel
        {
            Uuid = role.Uuid,
            Name = role.Role.Name
        })
        .ToArrayAsync();

        if (filter.Search != null)
        {
            var search = filter.Search.ToLower();

            roleOptions = roleOptions
            .Select(roleOption => new
            {
                RoleOptionDto = roleOption,
                Score = Fuzz.Ratio(roleOption.Name.ToLower(), search)
            })
            .Where(fuzzyRoleOption => fuzzyRoleOption.Score > 40)
            .OrderByDescending(fuzzyRoleOption => fuzzyRoleOption.Score)
            .Select(fuzzyRoleOption => fuzzyRoleOption.RoleOptionDto)
            .ToArray();
        }

        var totalItems = roleOptions.Length;

        roleOptions = roleOptions
        .Skip((pagination.Page - 1) * 5)
        .Take(5)
        .ToArray();

        return new ClsPaginatedModel<ClsOptionModel>
        {
            Data = roleOptions,
            Pagination = new ClsPaginatedModel<ClsOptionModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedModel<ClsOptionModel>> SearchBranchesAsync(ClsOptionFilter filter, ClsOptionPaginationFilter pagination, ClsMemberContext memberContext)
    {
        var branchOptions = await _AppDBContext.Branches
        .AsNoTracking()
        .Where(branch =>
            branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsOptionModel
        {
            Uuid = branch.Uuid,
            Name = branch.Name
        })
        .ToArrayAsync();

        if (filter.Search != null)
        {
            var search = filter.Search.ToLower();

            branchOptions = branchOptions
            .Select(branchOption => new
            {
                BranchOption = branchOption,
                Score = Fuzz.Ratio(branchOption.Name.ToLower(), search)
            })
            .Where(fuzzyBranchOption => fuzzyBranchOption.Score > 40)
            .OrderByDescending(fuzzyBranchOption => fuzzyBranchOption.Score)
            .Select(fuzzyBranchOption => fuzzyBranchOption.BranchOption)
            .ToArray();
        }

        var totalItems = branchOptions.Length;

        branchOptions = branchOptions
        .Skip((pagination.Page - 1) * 5)
        .Take(5)
        .ToArray();

        return new ClsPaginatedModel<ClsOptionModel>
        {
            Data = branchOptions,
            Pagination = new ClsPaginatedModel<ClsOptionModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedModel<ClsMemberModel>> SearchAsync(ClsMemberFilter filter, ClsPaginationFilter pagination, ClsMemberContext memberContext)
    {
        var membersQuery = _AppDBContext.Members
        .AsNoTracking()
        .Where(partnerMember =>
            partnerMember.PartnerUuid == memberContext.PartnerUuid &&
            !partnerMember.IsDeleted
        );


        if (filter.RoleUuids.Length > 0) membersQuery = membersQuery.Where(member => filter.RoleUuids.Contains(member.RoleUuid));
        if (filter.BranchUuids.Length > 0) membersQuery = membersQuery.Where(member => filter.BranchUuids.Contains(member.BranchUuid));

        if (filter.Status != null) membersQuery = membersQuery.Where(member => member.Status == filter.Status);

        var members = await membersQuery
        .Select(member => new ClsMemberModel
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar == null ? null : new ClsImageModel
            {
                Id = member.Avatar.Id,
                Url = member.Avatar.Url
            },
            Role = new ClsMemberModel.ClsRoleModel
            {
                Name = member.Role.Role.Name,
                Permissions = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == member.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Type)
                .ToArray()
            },
            Branch = new ClsMemberModel.ClsBranchModel
            {
                Location = new ClsMemberModel.ClsBranchModel.ClsLocationModel
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

        if (filter.Search != null)
        {
            var search = filter.Search.ToLower();

            members = members
            .Select(member => new
            {
                Member = member,
                Score = new int[]
                {
                    Fuzz.Ratio(member.Username.ToLower(), search),
                    Fuzz.Ratio(member.Email.ToLower(), search),
                }.Max()
            })
            .Where(fuzzyMember => fuzzyMember.Score > 40)
            .OrderByDescending(fuzzyMember => fuzzyMember.Score)
            .Select(fuzzyMember => fuzzyMember.Member)
            .ToArray();
        }

        var totalItems = members.Length;

        members = members
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        return new ClsPaginatedModel<ClsMemberModel>
        {
            Data = members,
            Pagination = new ClsPaginatedModel<ClsMemberModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
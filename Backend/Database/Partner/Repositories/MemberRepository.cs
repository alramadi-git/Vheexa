using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using FuzzySharp;

using Database.Enums;
using Database.Partner.Enums;

using Database.Inputs;
using Database.Partner.Inputs;

using Database.Partner.Contexts;

using Database.Entities;
using Database.Partner.Models;
using Database.Models;

namespace Database.Partner.Repositories;

public class ClsMemberRepository
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

    public ClsMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsMemberCreateInput member, ClsMemberContext memberContext)
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

            var hashedPassword = new PasswordHasher<object?>().HashPassword(null, member.Password);
            var newMember = new ClsMemberEntity
            {
                Uuid = Guid.NewGuid(),
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
        var roleOptionDtos = await _AppDBContext.PartnerRoles
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

        return roleOptionDtos;
    }
    public async Task<ClsOptionModel[]> ReadBranchesAsync(Guid[] uuids, ClsMemberContext memberContext)
    {
        var branchOptionDto = await _AppDBContext.Branches
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

        return branchOptionDto;
    }

    public async Task<ClsMemberModel> ReadOneAsync(Guid memberUuid, ClsMemberContext memberContext)
    {
        var member = await _AppDBContext.Members
        .AsNoTracking()
        .Where(partnerMember =>
            partnerMember.Uuid == memberUuid &&
            partnerMember.PartnerUuid == memberContext.PartnerUuid &&
            !partnerMember.IsDeleted
        )
        .Select(member => new
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new
            {
                Name = member.Role.Role.Name,
                PermissionUuids = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == member.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Uuid)
                .ToArray()
            },
            Branch = new
            {
                Location = new
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
        .FirstAsync();

        var memberDto = new ClsMemberModel
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new ClsMemberModel.ClsRoleModel
            {
                Name = member.Role.Name,
                Permissions = member.Role.PermissionUuids
                .Select(permissionUuid => PermissionUuidsMap[permissionUuid])
                .ToArray(),
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
        };

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
            .FirstAsync();
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
    public async Task<ClsPaginatedModel<ClsOptionModel>> SearchRolesAsync(ClsOptionFilterInput filter, ClsOptionPaginationInput pagination, ClsMemberContext memberContext)
    {
        var roleOptionDtos = await _AppDBContext.PartnerRoles
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

        return new ClsPaginatedModel<ClsOptionModel>
        {
            Data = roleOptionDtos,
            Pagination = new ClsPaginatedModel<ClsOptionModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedModel<ClsOptionModel>> SearchBranchesAsync(ClsOptionFilterInput filter, ClsOptionPaginationInput pagination, ClsMemberContext memberContext)
    {
        var branchOptionDtos = await _AppDBContext.Branches
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

        return new ClsPaginatedModel<ClsOptionModel>
        {
            Data = branchOptionDtos,
            Pagination = new ClsPaginatedModel<ClsOptionModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = 5,
                TotalItems = totalItems
            }
        };
    }
    public async Task<ClsPaginatedModel<ClsMemberModel>> SearchAsync(ClsMemberFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
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
        .Select(member => new
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new
            {
                Name = member.Role.Role.Name,
                PermissionUuids = _AppDBContext.RolePermissions
            .Where(rolePermission => rolePermission.RoleUuid == member.RoleUuid)
            .Select(rolePermission => rolePermission.Permission.Uuid)
            .ToArray()
            },
            Branch = new
            {
                Location = new
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

        if (filter.Search != null) members = members
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

        var totalItems = members.Length;

        members = members
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        var memberDtos = members
        .Select(member => new ClsMemberModel
        {
            Uuid = member.Uuid,
            Avatar = member.Avatar,
            Role = new ClsMemberModel.ClsRoleModel
            {
                Name = member.Role.Name,
                Permissions = member.Role.PermissionUuids
                .Select(permission => PermissionUuidsMap[permission])
                .ToArray(),
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
        }).ToArray();

        return new ClsPaginatedModel<ClsMemberModel>
        {
            Data = memberDtos,
            Pagination = new ClsPaginatedModel<ClsMemberModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
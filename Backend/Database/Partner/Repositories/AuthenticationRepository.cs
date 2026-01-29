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

public class ClsAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsMemberDto> RegisterAsync(ClsMemberCreateParameter member, ClsMemberContext memberContext)
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
    public async Task<ClsMemberDto> LoginAsync(Guid memberUuid, ClsMemberContext memberContext)
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
};
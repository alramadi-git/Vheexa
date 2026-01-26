using Microsoft.EntityFrameworkCore;

using Database.Entities;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Partner.Contexts;

namespace Database.Partner.Repositories;

public class ClsBranchRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsBranchRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsBranchCreateParameter branchCreateDTO, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var newLocation = new ClsLocationEntity
            {
                Uuid = Guid.NewGuid(),
                Country = branchCreateDTO.Location.Country,
                City = branchCreateDTO.Location.City,
                Street = branchCreateDTO.Location.Street,
                Latitude = branchCreateDTO.Location.Latitude,
                Longitude = branchCreateDTO.Location.Longitude,
            };

            var newBranch = new ClsBranchEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = memberContext.PartnerUuid,
                LocationUuid = newLocation.Uuid,
                Name = branchCreateDTO.Name,
                PhoneNumber = branchCreateDTO.PhoneNumber,
                Email = branchCreateDTO.Email,
                MemberCount = 0,
                Status = (ClsBranchEntity.STATUS)branchCreateDTO.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };


            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.CREATE,
                Entity = ClsHistoryEntity.ENTITY.BRANCHES,
                EntityUuid = newBranch.Uuid,
            };
            var newMemberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = newHistory.Uuid,
                MemberUuid = memberContext.Uuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Locations.Add(newLocation);
            _AppDBContext.Branches.Add(newBranch);

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
    public async Task<ClsBranchDto> ReadOneAsync(Guid branchUuid, ClsMemberContext memberContext)
    {
        var branch = await _AppDBContext.Branches
        .Where(branch =>
            branch.Uuid == branchUuid &&
            branch.PartnerUuid == memberContext.PartnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsBranchDto
        {
            Uuid = branch.Uuid,
            Location = new ClsBranchDto.ClsLocationDto
            {
                Country = branch.Location.Country,
                City = branch.Location.City,
                Street = branch.Location.Street,
                Latitude = branch.Location.Latitude,
                Longitude = branch.Location.Longitude
            },
            Name = branch.Name,
            PhoneNumber = branch.PhoneNumber,
            Email = branch.Email,
            MemberCount = branch.MemberCount,
            Status = (ClsBranchDto.STATUS)branch.Status,
            CreatedAt = branch.CreatedAt,
            UpdatedAt = branch.UpdatedAt,
        })
        .SingleAsync();

        return branch;
    }
    public async Task<ClsPaginatedDto<ClsBranchDto>> ReadManyAsync(ClsBranchFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var branches = _AppDBContext.Branches
        .Where(partnerBranch =>
            partnerBranch.PartnerUuid == memberContext.PartnerUuid &&
            !partnerBranch.IsDeleted
        );

        if (filter.Search != null)
        {
            var search = filter.Search.ToLower();
            branches = branches
            .Where(branch =>
                branch.Name.ToLower().Contains(search) ||
                branch.Email.ToLower().Contains(search) ||
                branch.Location.Country.ToLower().Contains(search) ||
                branch.Location.City.ToLower().Contains(search) ||
                branch.Location.Street.ToLower().Contains(search)
            );
        }
        if (filter.Status != null) branches = branches.Where(branch => branch.Status == (ClsBranchEntity.STATUS)filter.Status);

        var count = await branches.CountAsync();

        branches = branches
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize);

        var branchDtos = branches.Select(branch => new ClsBranchDto
        {
            Uuid = branch.Uuid,
            Location = new ClsBranchDto.ClsLocationDto
            {
                Country = branch.Location.Country,
                City = branch.Location.City,
                Street = branch.Location.Street,
                Latitude = branch.Location.Latitude,
                Longitude = branch.Location.Longitude
            },
            Name = branch.Name,
            PhoneNumber = branch.PhoneNumber,
            Email = branch.Email,
            MemberCount = branch.MemberCount,
            Status = (ClsBranchDto.STATUS)branch.Status,
            CreatedAt = branch.CreatedAt,
            UpdatedAt = branch.UpdatedAt,
        });

        return new ClsPaginatedDto<ClsBranchDto>(
            await branchDtos.ToArrayAsync(),
            new ClsPaginatedDto<ClsBranchDto>.ClsPaginationDto(pagination.Page, pagination.PageSize, count)
        );
    }
    public async Task DeleteOneAsync(Guid branchUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var branch = await _AppDBContext.Branches
            .Where(partnerBranch =>
                partnerBranch.Uuid == branchUuid &&
                partnerBranch.PartnerUuid == memberContext.PartnerUuid &&
                !partnerBranch.IsDeleted
            )
            .SingleAsync();
            branch.UpdatedAt = DateTime.UtcNow;
            branch.IsDeleted = true;
            branch.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.DELETE,
                Entity = ClsHistoryEntity.ENTITY.BRANCHES,
                EntityUuid = branchUuid,

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
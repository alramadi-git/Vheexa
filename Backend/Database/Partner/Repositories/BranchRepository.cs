using Microsoft.EntityFrameworkCore;

using Database.Entities;

using Database.DTOs;
using Database.Partner.DTOs;

namespace Database.Partner.Repositories;

public class ClsBranchRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsBranchRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsBranchCreateDTO branchCreateDTO, Guid partnerUuid, Guid memberUuid)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var location = new ClsLocationEntity
            {
                Uuid = Guid.NewGuid(),
                Country = branchCreateDTO.Location.Country,
                City = branchCreateDTO.Location.City,
                Street = branchCreateDTO.Location.Street,
                Latitude = branchCreateDTO.Location.Latitude,
                Longitude = branchCreateDTO.Location.Longitude,
            };

            var branch = new ClsBranchEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = partnerUuid,
                LocationUuid = location.Uuid,
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


            var history = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.CREATE,
                Entity = ClsHistoryEntity.ENTITY.BRANCHES,
                EntityUuid = branch.Uuid,
            };
            var memberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = history.Uuid,
                MemberUuid = memberUuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Locations.Add(location);
            _AppDBContext.Branches.Add(branch);

            _AppDBContext.Histories.Add(history);
            _AppDBContext.MemberHistories.Add(memberHistory);

            await _AppDBContext.SaveChangesAsync();
            await transaction.CommitAsync();
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
    public async Task<ClsBranchDTO> ReadOneAsync(Guid branchUuid, Guid partnerUuid)
    {
        var branch = await _AppDBContext.Branches
        .Where(branch =>
            branch.Uuid == branchUuid &&
            branch.PartnerUuid == partnerUuid &&
            !branch.IsDeleted
        )
        .Select(branch => new ClsBranchDTO
        {
            Uuid = branch.Uuid,
            Location = new ClsBranchDTO.ClsLocationDTO
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
            Status = (ClsBranchDTO.STATUS)branch.Status,
            CreatedAt = branch.CreatedAt,
            UpdatedAt = branch.UpdatedAt,
        })
        .SingleAsync();

        return branch;
    }
    public async Task<ClsPaginatedDTO<ClsBranchDTO>> ReadManyAsync(ClsBranchFilterDTO filter, ClsPaginationFilterDTO pagination, Guid partnerUuid)
    {
        var branches = _AppDBContext.Branches
        .Where(partnerBranch =>
            partnerBranch.PartnerUuid == partnerUuid &&
            !partnerBranch.IsDeleted
        )
        .Select(branch => new ClsBranchDTO
        {
            Uuid = branch.Uuid,
            Location = new ClsBranchDTO.ClsLocationDTO
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
            Status = (ClsBranchDTO.STATUS)branch.Status,
            CreatedAt = branch.CreatedAt,
            UpdatedAt = branch.UpdatedAt,
        });

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
        if (filter.Status != null) branches = branches.Where(branch => branch.Status == (ClsBranchDTO.STATUS)filter.Status);

        var count = await branches.CountAsync();

        branches = branches
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize);

        return new ClsPaginatedDTO<ClsBranchDTO>(
            await branches.ToArrayAsync(),
            new ClsPaginatedDTO<ClsBranchDTO>.ClsPaginationDTO(pagination.Page, pagination.PageSize, count)
        );
    }
    public async Task DeleteOneAsync(Guid branchUuid, Guid partnerUuid, Guid memberUuid)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var branch = await _AppDBContext.Branches
            .Where(partnerBranch =>
                partnerBranch.Uuid == branchUuid &&
                partnerBranch.PartnerUuid == partnerUuid &&
                !partnerBranch.IsDeleted
            )
            .SingleAsync();
            branch.UpdatedAt = DateTime.UtcNow;
            branch.IsDeleted = true;
            branch.DeletedAt = DateTime.UtcNow;

            var history = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = ClsHistoryEntity.ACTION.DELETE,
                Entity = ClsHistoryEntity.ENTITY.BRANCHES,
                EntityUuid = branchUuid,

            };
            var memberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = history.Uuid,
                MemberUuid = memberUuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.Histories.Add(history);
            _AppDBContext.MemberHistories.Add(memberHistory);

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
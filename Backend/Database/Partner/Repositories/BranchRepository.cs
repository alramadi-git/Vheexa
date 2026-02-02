using Microsoft.EntityFrameworkCore;

using FuzzySharp;

using Database.Entities;

using Database.Inputs;
using Database.Partner.Inputs;

using Database.Partner.Contexts;

using Database.Enums;

using Database.Models;
using Database.Partner.Models;

namespace Database.Partner.Repositories;

public class ClsBranchRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsBranchRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsBranchCreateInput branchCreateDTO, ClsMemberContext memberContext)
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
                Status = branchCreateDTO.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };


            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.CREATE,
                Entity = HISTORY_ENTITY.BRANCHES,
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
            .FirstAsync();

            if (branch.MemberCount > 0) throw new ArgumentException("Cannot delete branch with assigned members");

            branch.UpdatedAt = DateTime.UtcNow;
            branch.IsDeleted = true;
            branch.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.DELETE,
                Entity = HISTORY_ENTITY.BRANCHES,
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
    public async Task<ClsPaginatedModel<ClsBranchModel>> SearchAsync(ClsBranchFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        var branchesQuery = _AppDBContext.Branches
        .AsNoTracking()
        .Where(partnerBranch =>
            partnerBranch.PartnerUuid == memberContext.PartnerUuid &&
            !partnerBranch.IsDeleted
        );

        if (filter.Status != null) branchesQuery = branchesQuery.Where(branch => branch.Status == filter.Status);

        var branchDtos = await branchesQuery
        .Select(branch => new ClsBranchModel
        {
            Uuid = branch.Uuid,
            Location = new ClsBranchModel.ClsLocationModel
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
            Status = branch.Status,
            CreatedAt = branch.CreatedAt,
            UpdatedAt = branch.UpdatedAt,
        })
        .ToArrayAsync();

        if (filter.Search != null)
        {
            branchDtos = branchDtos
            .Select(branchDto => new
            {
                BranchDto = branchDto,
                Score = new int[]
                {
                    Fuzz.Ratio(branchDto.Name, filter.Search),
                    Fuzz.Ratio(branchDto.Email, filter.Search),
                    Fuzz.Ratio(branchDto.Location.Country, filter.Search),
                    Fuzz.Ratio(branchDto.Location.City, filter.Search),
                    Fuzz.Ratio(branchDto.Location.Street, filter.Search),
                }
                .Max()
            })
            .Where(fuzzyBranchDto => fuzzyBranchDto.Score > 80)
            .OrderByDescending(fuzzyBranchDto => fuzzyBranchDto.Score)
            .Select(fuzzyBranchDto => fuzzyBranchDto.BranchDto)
            .ToArray();
        }

        var totalItems = branchDtos.Length;

        branchDtos = branchDtos
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        return new ClsPaginatedModel<ClsBranchModel>
        {
            Data = branchDtos,
            Pagination = new ClsPaginatedModel<ClsBranchModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
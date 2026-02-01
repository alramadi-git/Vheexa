using Microsoft.EntityFrameworkCore;

using FuzzySharp;

using Database.Inputs;
using Database.Partner.Inputs;

using Database.Partner.Contexts;

using Database.Entities;

using Database.Enums;

using Database.Models;
using Database.Partner.Models;

namespace Database.Partner.Repositories;

public class ClsVehicleModelRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsVehicleModelRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsVehicleModelCreateInput vehicleModel, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var vehicleModelUuid = Guid.NewGuid();
            var newVehicleModel = new ClsVehicleModelEntity
            {
                Uuid = vehicleModelUuid,
                PartnerUuid = memberContext.PartnerUuid,
                Name = vehicleModel.Name,
                Description = vehicleModel.Description,
                Category = vehicleModel.Category,
                Manufacturer = vehicleModel.Manufacturer,
                MarketLaunch = vehicleModel.MarketLaunch,
                Capacity = vehicleModel.Capacity,
                Transmission = vehicleModel.Transmission,
                Fuel = vehicleModel.Fuel,
                Price = vehicleModel.Price,
                Discount = vehicleModel.Discount,
                Tags = string.Join(", ", vehicleModel.Tags),
                Status = vehicleModel.Status,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                IsDeleted = false,
                DeletedAt = null,
            };

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.CREATE,
                Entity = HISTORY_ENTITY.VEHICLE_MODELS,
                EntityUuid = newVehicleModel.Uuid,
            };
            var newMemberHistory = new ClsMemberHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                HistoryUuid = newHistory.Uuid,
                MemberUuid = memberContext.Uuid,
                CreatedAt = DateTime.UtcNow,
            };

            _AppDBContext.VehicleModels.Add(newVehicleModel);

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
    public async Task<ClsVehicleModelModel> ReadOneAsync(Guid vehicleModelUuid, ClsMemberContext memberContext)
    {
        var vehicleModel = await _AppDBContext.VehicleModels
        .Where(partnerVehicleModel =>
            partnerVehicleModel.Uuid == vehicleModelUuid &&
            partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !partnerVehicleModel.IsDeleted
        )
        .Select(vehicleModel => new ClsVehicleModelModel
        {
            Uuid = vehicleModel.Uuid,
            Thumbnail = vehicleModel.Thumbnail,
            Gallery = _AppDBContext.VehicleModelGalleries
            .Where(image => image.VehicleModelUuid == vehicleModel.Uuid)
            .Select(image => new ClsVehicleModelModel.ClsGalleryModel
            {
                Uuid = image.Uuid,
                Url = image.Url
            })
            .ToArray(),
            Name = vehicleModel.Name,
            Description = vehicleModel.Description,
            Category = vehicleModel.Category,
            Manufacturer = vehicleModel.Manufacturer,
            MarketLaunch = vehicleModel.MarketLaunch,
            Capacity = vehicleModel.Capacity,
            Transmission = vehicleModel.Transmission,
            Fuel = vehicleModel.Fuel,
            Price = vehicleModel.Price,
            Discount = vehicleModel.Discount,
            Tags = vehicleModel.Tags,
            Status = vehicleModel.Status,
            CreatedAt = vehicleModel.CreatedAt,
            UpdatedAt = vehicleModel.UpdatedAt,
        })
        .FirstAsync();

        return vehicleModel;
    }
    public async Task DeleteOneAsync(Guid vehicleModelUuid, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var vehicleModel = await _AppDBContext.VehicleModels
            .Where(partnerVehicleModel =>
                partnerVehicleModel.Uuid == vehicleModelUuid &&
                partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
                !partnerVehicleModel.IsDeleted
            )
            .FirstAsync();
            vehicleModel.UpdatedAt = DateTime.UtcNow;
            vehicleModel.IsDeleted = true;
            vehicleModel.DeletedAt = DateTime.UtcNow;

            var newHistory = new ClsHistoryEntity
            {
                Uuid = Guid.NewGuid(),
                Action = HISTORY_ACTION.DELETE,
                Entity = HISTORY_ENTITY.VEHICLE_MODELS,
                EntityUuid = vehicleModelUuid,
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
    public async Task<ClsPaginatedModel<ClsVehicleModelModel>> SearchAsync(ClsVehicleModelFilterInput filter, ClsPaginationInput pagination, ClsMemberContext memberContext)
    {
        var vehicleModels = _AppDBContext.VehicleModels
        .Where(partnerVehicleModel =>
            partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !partnerVehicleModel.IsDeleted
        );

        if (filter.Categories.Length > 0) vehicleModels = vehicleModels.Where(partnerVehicleModel => filter.Categories.Contains(partnerVehicleModel.Category));

        if (filter.Capacity.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Capacity >= filter.Capacity.Min);
        if (filter.Capacity.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Capacity <= filter.Capacity.Max);

        if (filter.Price.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Price >= filter.Price.Min);
        if (filter.Price.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Price <= filter.Price.Max);

        if (filter.Discount.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Discount >= filter.Discount.Min);
        if (filter.Discount.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Discount <= filter.Discount.Max);

        if (filter.Status != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Status == filter.Status);

        var vehicleModelDtos = await vehicleModels
        .Select(vehicleModel => new ClsVehicleModelModel
        {
            Uuid = vehicleModel.Uuid,
            Thumbnail = vehicleModel.Thumbnail,
            Gallery = _AppDBContext.VehicleModelGalleries
            .Where(image => image.VehicleModelUuid == vehicleModel.Uuid)
            .Select(image => new ClsVehicleModelModel.ClsGalleryModel
            {
                Uuid = image.Uuid,
                Url = image.Url
            })
            .ToArray(),
            Name = vehicleModel.Name,
            Description = vehicleModel.Description,
            Category = vehicleModel.Category,
            Manufacturer = vehicleModel.Manufacturer,
            MarketLaunch = vehicleModel.MarketLaunch,
            Capacity = vehicleModel.Capacity,
            Transmission = vehicleModel.Transmission,
            Fuel = vehicleModel.Fuel,
            Price = vehicleModel.Price,
            Discount = vehicleModel.Discount,
            Tags = vehicleModel.Tags,
            Status = vehicleModel.Status,
            CreatedAt = vehicleModel.CreatedAt,
            UpdatedAt = vehicleModel.UpdatedAt,
        })
        .ToArrayAsync();

        if (filter.Search != null) vehicleModelDtos = vehicleModelDtos.
        Select(vehicleModelDto => new
        {
            VehicleModelDto = vehicleModelDto,
            Score = new int[]
            {
                Fuzz.Ratio(vehicleModelDto.Name, filter.Search),
                Fuzz.Ratio(vehicleModelDto.Description, filter.Search),
                Fuzz.Ratio(vehicleModelDto.Manufacturer, filter.Search),
                Fuzz.Ratio(vehicleModelDto.Transmission, filter.Search),
                Fuzz.Ratio(vehicleModelDto.Fuel, filter.Search),
                Fuzz.Ratio(vehicleModelDto.Tags, filter.Search),
            }
            .Max()
        })
        .Where(fuzzyVehicleModelDto => fuzzyVehicleModelDto.Score > 80)
        .OrderByDescending(fuzzyVehicleModelDto => fuzzyVehicleModelDto.Score)
        .Select(fuzzyVehicleModelDto => fuzzyVehicleModelDto.VehicleModelDto)
        .ToArray();

        var totalItems = vehicleModelDtos.Length;

        vehicleModelDtos = vehicleModelDtos
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize)
        .ToArray();

        return new ClsPaginatedModel<ClsVehicleModelModel>
        {
            Data = vehicleModelDtos,
            Pagination = new ClsPaginatedModel<ClsVehicleModelModel>.ClsPaginationModel
            {
                Page = pagination.Page,
                PageSize = pagination.PageSize,
                TotalItems = totalItems
            }
        };
    }
};
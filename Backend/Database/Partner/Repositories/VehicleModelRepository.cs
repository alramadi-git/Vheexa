using Microsoft.EntityFrameworkCore;
using FuzzySharp;

using Database.Enums;

using Database.Entities;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Partner.Contexts;

namespace Database.Partner.Repositories;

public class ClsVehicleModelRepository
{
    private readonly AppDBContext _AppDBContext;

    public ClsVehicleModelRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task CreateOneAsync(ClsVehicleModelCreateParameter vehicleModel, ClsMemberContext memberContext)
    {
        using var transaction = await _AppDBContext.Database.BeginTransactionAsync();
        try
        {
            var vehicleModelUuid = Guid.NewGuid();
            var newVehicleModelGallery = vehicleModel.Gallery.Select((image, index) => new ClsVehicleModelGalleryEntity
            {

                Uuid = Guid.NewGuid(),
                VehicleModelUuid = vehicleModelUuid,
                Index = index,
                Url = image,
                IsDeleted = false,
                DeletedAt = null,
            }).ToArray();
            var newVehicleModel = new ClsVehicleModelEntity
            {
                Uuid = vehicleModelUuid,
                PartnerUuid = memberContext.PartnerUuid,
                Thumbnail = vehicleModel.Thumbnail,
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
            _AppDBContext.VehicleModelGalleries.AddRange(newVehicleModelGallery);

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
    public async Task<ClsVehicleModelDto> ReadOneAsync(Guid vehicleModelUuid, ClsMemberContext memberContext)
    {
        var vehicleModel = await _AppDBContext.VehicleModels
        .Where(partnerVehicleModel =>
            partnerVehicleModel.Uuid == vehicleModelUuid &&
            partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !partnerVehicleModel.IsDeleted
        )
        .Select(vehicleModel => new ClsVehicleModelDto
        {
            Uuid = vehicleModel.Uuid,
            Thumbnail = vehicleModel.Thumbnail,
            Gallery = _AppDBContext.VehicleModelGalleries
            .Where(image => image.VehicleModelUuid == vehicleModel.Uuid)
            .Select(image => new ClsVehicleModelDto.ClsGalleryDto
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
        .SingleAsync();

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
            .SingleAsync();
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
    public async Task<ClsPaginatedDto<ClsVehicleModelDto>> SearchAsync(ClsVehicleModelFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var vehicleModels = _AppDBContext.VehicleModels
        .Where(partnerVehicleModel =>
            partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !partnerVehicleModel.IsDeleted
        );

        if (filter.Categories.Length > 0) vehicleModels = vehicleModels.Where(partnerVehicleModel => filter.Categories.Contains(partnerVehicleModel.Category));

        if (filter.Manufacturers.Length > 0) vehicleModels = vehicleModels.Where(partnerVehicleModel => filter.Manufacturers.Contains(partnerVehicleModel.Manufacturer));

        if (filter.Capacity.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Capacity >= filter.Capacity.Min);
        if (filter.Capacity.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Capacity <= filter.Capacity.Max);

        if (filter.Transmissions.Length > 0) vehicleModels = vehicleModels.Where(partnerVehicleModel => filter.Transmissions.Contains(partnerVehicleModel.Transmission));
        if (filter.Fuels.Length > 0) vehicleModels = vehicleModels.Where(partnerVehicleModel => filter.Fuels.Contains(partnerVehicleModel.Fuel));

        if (filter.Price.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Price >= filter.Price.Min);
        if (filter.Price.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Price <= filter.Price.Max);

        if (filter.Discount.Min != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Discount >= filter.Discount.Min);
        if (filter.Discount.Max != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Discount <= filter.Discount.Max);

        if (filter.Status != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Status == filter.Status);

        var vehicleModelDtos = await vehicleModels
        .Select(vehicleModel => new ClsVehicleModelDto
        {
            Uuid = vehicleModel.Uuid,
            Thumbnail = vehicleModel.Thumbnail,
            Gallery = _AppDBContext.VehicleModelGalleries
            .Where(image => image.VehicleModelUuid == vehicleModel.Uuid)
            .Select(image => new ClsVehicleModelDto.ClsGalleryDto
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

        return new ClsPaginatedDto<ClsVehicleModelDto>(
            vehicleModelDtos,
            new ClsPaginatedDto<ClsVehicleModelDto>.ClsPaginationDto(pagination.Page, pagination.PageSize, totalItems)
        );
    }
};
using Microsoft.EntityFrameworkCore;

using Database.Entities;

using Database.Dtos;
using Database.Partner.Dtos;

using Database.Parameters;
using Database.Partner.Parameters;

using Database.Partner.Contexts;
using Database.Enums;

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
            var newVehicleModelGallery = new ClsVehicleModelGalleryEntity
            {
                Uuid = Guid.NewGuid(),
                
                IsDeleted = false,
                DeletedAt = null,
            };
            var newVehicleModel = new ClsVehicleModelEntity
            {
                Uuid = Guid.NewGuid(),
                PartnerUuid = memberContext.PartnerUuid,
                Thumbnail = vehicleModel.Thumbnail,
                Gallery = vehicleModel.Gallery,
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
            Gallery = _AppDBContext.VehicleModelGallery
            .Where(image => image.VehicleModelUuid == vehicleModelUuid)
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
    public async Task<ClsPaginatedDto<ClsVehicleModelDto>> ReadManyAsync(ClsVehicleModelFilterParameter filter, ClsPaginationFilterParameter pagination, ClsMemberContext memberContext)
    {
        var vehicleModels = _AppDBContext.VehicleModels
        .Where(partnerVehicleModel =>
            partnerVehicleModel.PartnerUuid == memberContext.PartnerUuid &&
            !partnerVehicleModel.IsDeleted
        );

        if (filter.Search != null) vehicleModels = vehicleModels.Where(partnerVehicleModel =>
            partnerVehicleModel.Username.ToLower().Contains(filter.Search.ToLower()) ||
            partnerVehicleModel.Email.ToLower().Contains(filter.Search.ToLower())
        );

        if (filter.Roles.Length > 0) vehicleModels = vehicleModels.Where(vehicleModel => filter.Roles.Contains(vehicleModel.RoleUuid));
        if (filter.Branches.Length > 0) vehicleModels = vehicleModels.Where(vehicleModel => filter.Branches.Contains(vehicleModel.BranchUuid));

        if (filter.Status != null) vehicleModels = vehicleModels.Where(partnerVehicleModel => partnerVehicleModel.Status == (ClsVehicleModelEntity.STATUS)filter.Status);

        var count = await vehicleModels.CountAsync();

        vehicleModels = vehicleModels
        .Skip((pagination.Page - 1) * pagination.PageSize)
        .Take(pagination.PageSize);

        var vehicleModelDtos = vehicleModels
        .Select(vehicleModel => new ClsVehicleModelDto
        {
            Uuid = vehicleModel.Uuid,
            Avatar = vehicleModel.Avatar,
            Role = new ClsVehicleModelDto.ClsRoleDto
            {
                Name = vehicleModel.Role.Role.Name,
                Permissions = _AppDBContext.RolePermissions
                .Where(rolePermission => rolePermission.RoleUuid == vehicleModel.RoleUuid)
                .Select(rolePermission => rolePermission.Permission.Name)
                .ToArray()
            },
            Branch = new ClsVehicleModelDto.ClsBranchDto
            {
                Location = new ClsVehicleModelDto.ClsBranchDto.ClsLocationDto
                {
                    Country = vehicleModel.Branch.Location.Country,
                    City = vehicleModel.Branch.Location.City,
                    Street = vehicleModel.Branch.Location.Street,
                    Latitude = vehicleModel.Branch.Location.Latitude,
                    Longitude = vehicleModel.Branch.Location.Longitude
                },
                Name = vehicleModel.Branch.Name,
                PhoneNumber = vehicleModel.Branch.PhoneNumber,
                Email = vehicleModel.Branch.Email,
            },
            Username = vehicleModel.Username,
            Email = vehicleModel.Email,
            Status = (ClsVehicleModelDto.STATUS)vehicleModel.Status,
            CreatedAt = vehicleModel.CreatedAt,
            UpdatedAt = vehicleModel.UpdatedAt,
        });

        return new ClsPaginatedDto<ClsVehicleModelDto>(
            await vehicleModelDtos.ToArrayAsync(),
            new ClsPaginatedDto<ClsVehicleModelDto>.ClsPaginationDto(pagination.Page, pagination.PageSize, count)
        );
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
};
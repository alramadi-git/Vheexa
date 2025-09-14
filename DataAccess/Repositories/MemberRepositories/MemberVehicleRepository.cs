using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync(int partnerID, int memberID, VehicleCreateRequestDTO vehicleData)
    {
        var IsVehicleExist = await _AppDBContext.Vehicles
        .AnyAsync(vehicle =>
            vehicle.PartnerID == partnerID &&
            vehicle.Name == vehicleData.Name &&
            vehicle.Category == vehicleData.Category &&
            vehicle.Manufacturer == vehicleData.Manufacturer &&
            vehicle.ManufacturingYear == vehicleData.ManufacturingYear
        );

        if (IsVehicleExist == true) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, "Vehicle already exist.");

        var thumbnailEntityEntry = vehicleData.Thumbnail != null
        ? _AppDBContext.Images
            .Add(new ImageEntity
            {
                URL = vehicleData.Thumbnail.URL,
            })
        : null;

        var vehicleEntityEntry = _AppDBContext.Vehicles
        .Add(new VehicleEntity
        {
            PartnerID = partnerID,

            Thumbnail = thumbnailEntityEntry?.Entity,

            Name = vehicleData.Name,
            Description = vehicleData.Description,

            Category = vehicleData.Category,

            Manufacturer = vehicleData.Manufacturer,
            ManufacturingYear = vehicleData.ManufacturingYear,

            Capacity = vehicleData.Capacity,

            Tags = vehicleData.Tags,

            Price = vehicleData.Price,
            Discount = vehicleData.Discount,

            IsPublished = false,

            IsDeleted = false,
            DeletedAt = null,

            UpdatedAt = DateTime.Now,
            CreatedAt = DateTime.Now
        });

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(new TaskEntity
        {
            Action = TASK_ACTION_OPTION_ENTITY.CREATE,

            Table = TASK_TABLE_OPTION_ENTITY.VEHICLES,
            RowID = vehicleEntityEntry.Entity.ID,
        });

        var memberTaskEntityEntry = _AppDBContext.MemberTasks
        .Add(new MemberTaskEntity
        {
            MemberID = memberID,

            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.Now,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessOneResponseDTO<VehicleEntityDTO>> GetAsync(int partnerID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.Vehicles
        .Include(vehicle => vehicle.Thumbnail)
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.PartnerID == partnerID
        );

        var vehicle = await vehicleQuery
        .AsNoTracking()
        .FirstOrDefaultAsync()
        ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");


        return new(new(vehicle));
    }

    public async Task UpdateAsync(int partnerID, int memberID, int vehicleID, VehicleUpdateRequestDTO vehicleData)
    {
        var IsVehicleExistQuery = _AppDBContext.Vehicles
        .Where(vehicle =>
            vehicle.ID != vehicleID &&
            vehicle.PartnerID == partnerID &&
            vehicle.Name == vehicleData.Name &&
            vehicle.Category == vehicleData.Category &&
            vehicle.Manufacturer == vehicleData.Manufacturer &&
            vehicle.ManufacturingYear == vehicleData.ManufacturingYear
        );

        var IsVehicleExist = await IsVehicleExistQuery.AsNoTracking().FirstOrDefaultAsync();
        if (IsVehicleExist != null) throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.CONFLICT, $"Vehicle {IsVehicleExist.ID} already  exist.");

        var vehicleQuery = _AppDBContext.Vehicles
        .Include(vehicle => vehicle.Thumbnail)
        .Where(vehicle =>
            vehicle.ID == vehicleID &&
            vehicle.PartnerID == partnerID &&
            vehicle.IsDeleted == false
        );

        var vehicle = await vehicleQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        if (vehicleData.Thumbnail == null)
        {
            if (vehicle.Thumbnail != null)
            {
                _AppDBContext.Images.Remove(vehicle.Thumbnail);
                vehicle.Thumbnail = null;
            }
        }
        else
        {
            vehicle.Thumbnail!.URL = vehicleData.Thumbnail.URL;
        }

        vehicle.Name = vehicleData.Name;
        vehicle.Description = vehicleData.Description;

        vehicle.Category = vehicleData.Category;

        vehicle.Manufacturer = vehicleData.Manufacturer;
        vehicle.ManufacturingYear = vehicleData.ManufacturingYear;

        vehicle.Capacity = vehicleData.Capacity;

        vehicle.Tags = vehicleData.Tags;

        vehicle.Price = vehicleData.Price;
        vehicle.Discount = vehicleData.Discount;

        vehicle.UpdatedAt = DateTime.Now;

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(new TaskEntity
        {
            Action = TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = TASK_TABLE_OPTION_ENTITY.VEHICLES,
            RowID = vehicleID,
        });

        var memberTaskEntityEntry = _AppDBContext.MemberTasks
        .Add(new MemberTaskEntity
        {
            MemberID = memberID,

            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.Now,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    // public async Task GetManyAsync() { }

};
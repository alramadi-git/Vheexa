using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    // TODO: if with out instance it should be unpublished
    public async Task AddAsync(int partnerID, int memberID, VehicleCreateRequestDTO vehicleData)
    {
        var IsVehicleExist = await _AppDBContext.Vehicles
        .AnyAsync(vehicle =>
            vehicle.PartnerID == partnerID
            && vehicle.Name == vehicleData.Name
            && vehicle.Category == vehicleData.Category
            && vehicle.Manufacturer == vehicleData.Manufacturer
            && vehicle.ManufacturingYear == vehicleData.ManufacturingYear
            && vehicle.IsDeleted == false
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

    public async Task<SuccessResponseDTO<VehicleEntityDTO>> GetAsync(int partnerID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.Vehicles
        .Include(vehicle => vehicle.Thumbnail)
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.PartnerID == partnerID
            && vehicle.IsDeleted == false
        )
        .GroupJoin(
            _AppDBContext.VehicleImages
            .Where(vehicleImage =>
                 vehicleImage.IsDeleted == false
            ),
            vehicle => vehicle.ID,
            vehicleImage => vehicleImage.VehicleID,
            (vehicle, vehicleImages) =>
            new Tuple<VehicleEntity, IEnumerable<VehicleImageEntity>>(vehicle, vehicleImages)

        )
        .GroupJoin(
            _AppDBContext.VehicleInstances
            .Where(vehicleInstance =>
                vehicleInstance.IsDeleted == false
            ),
            tuple => tuple.Item1.ID,
            vehicleInstance => vehicleInstance.VehicleID,
            (tuple, vehicleInstance) =>
            new Tuple<VehicleEntity, IEnumerable<VehicleImageEntity>, IEnumerable<VehicleInstanceEntity>>(tuple.Item1, tuple.Item2, vehicleInstance)

        );

        var vehicleTuple = await vehicleQuery
        .AsNoTracking()
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        return new(new(vehicleTuple.Item1, vehicleTuple.Item2, vehicleTuple.Item3));
    }

    public async Task UpdateAsync(int partnerID, int memberID, int vehicleID, VehicleUpdateRequestDTO vehicleData)
    {
        var IsVehicleExistQuery = _AppDBContext.Vehicles
        .Where(vehicle =>
            vehicle.ID != vehicleID
            && vehicle.PartnerID == partnerID
            && vehicle.Name == vehicleData.Name
            && vehicle.Category == vehicleData.Category
            && vehicle.Manufacturer == vehicleData.Manufacturer
            && vehicle.ManufacturingYear == vehicleData.ManufacturingYear
            && vehicle.IsDeleted == false
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

    public async Task PublishedAsync(int partnerID, int memberID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.Vehicles
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.PartnerID == partnerID
            && vehicle.IsPublished == false
            && vehicle.IsDeleted == false
        );

        var vehicle = await vehicleQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

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

        vehicle.IsPublished = true;
        await _AppDBContext.SaveChangesAsync();
    }
    public async Task UnPublishedAsync(int partnerID, int memberID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.Vehicles
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.PartnerID == partnerID
            && vehicle.IsPublished == true
            && vehicle.IsDeleted == false
        );

        var vehicle = await vehicleQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

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

        vehicle.IsPublished = false;
        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessManyResponseDTO<VehicleEntityDTO>> GetManyAsync(int partnerID, VehicleFiltrationRequestDTO vehicleFiltration)
    {
        var vehiclesQuery = _AppDBContext.Vehicles
        .Include(vehicle => vehicle.Thumbnail)
        .Where(vehicle => vehicle.PartnerID == partnerID);

        if (vehicleFiltration.Name != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Name.Contains(vehicleFiltration.Name));
        if (vehicleFiltration.Description != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Description.Contains(vehicleFiltration.Description));

        if (vehicleFiltration.Category != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Category == vehicleFiltration.Category);

        if (vehicleFiltration.Manufacturer != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Manufacturer.Contains(vehicleFiltration.Manufacturer));

        if (vehicleFiltration.MinManufacturingYear != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.ManufacturingYear >= vehicleFiltration.MinManufacturingYear);
        if (vehicleFiltration.MaxManufacturingYear != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.ManufacturingYear <= vehicleFiltration.MaxManufacturingYear);

        if (vehicleFiltration.MinCapacity != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Capacity >= vehicleFiltration.MinCapacity);
        if (vehicleFiltration.MaxCapacity != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Capacity <= vehicleFiltration.MaxCapacity);

        if (vehicleFiltration.Tags != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Tags.Any(tag => vehicleFiltration.Tags.Contains(tag)));

        if (vehicleFiltration.MinPrice != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Price >= vehicleFiltration.MinPrice);
        if (vehicleFiltration.MaxPrice != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Price <= vehicleFiltration.MaxPrice);

        if (vehicleFiltration.MinDiscount != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Discount >= vehicleFiltration.MinDiscount);
        if (vehicleFiltration.MaxDiscount != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.Discount <= vehicleFiltration.MaxDiscount);

        vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.IsPublished == vehicleFiltration.IsPublished);

        if (vehicleFiltration.UpdatedAt != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.UpdatedAt == vehicleFiltration.UpdatedAt);
        else
        {
            if (vehicleFiltration.UpdatedBefore != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.UpdatedAt <= vehicleFiltration.UpdatedBefore);
            if (vehicleFiltration.UpdatedAfter != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.UpdatedAt >= vehicleFiltration.UpdatedAfter);
        }

        if (vehicleFiltration.CreatedAt != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.CreatedAt == vehicleFiltration.CreatedAt);
        else
        {
            if (vehicleFiltration.CreatedBefore != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.CreatedAt <= vehicleFiltration.CreatedBefore);
            if (vehicleFiltration.CreatedAfter != null) vehiclesQuery = vehiclesQuery.Where(vehicles => vehicles.CreatedAt >= vehicleFiltration.CreatedAfter);
        }


        var vehicleTotalRecords = await vehiclesQuery.CountAsync();

        if (vehicleFiltration.Sorting.Ascending == true)
        {
            switch (vehicleFiltration.Sorting.By)
            {
                case VEHICLE_SORTING_OPTION_REQUEST_DTO.NAME:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Name);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CATEGORY:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Category);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MANUFACTURER:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Manufacturer);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MANUFACTURING_YEAR:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.ManufacturingYear);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CAPACITY:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Capacity);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.PRICE:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Price);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.DISCOUNT:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.Discount);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.PUBLICATION:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.IsPublished);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.UpdatedAt);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CREATION:
                    vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.CreatedAt);
                    break;
            }
        }
        else
        {
            switch (vehicleFiltration.Sorting.By)
            {
                case VEHICLE_SORTING_OPTION_REQUEST_DTO.NAME:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Name);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CATEGORY:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Category);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MANUFACTURER:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Manufacturer);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MANUFACTURING_YEAR:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.ManufacturingYear);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CAPACITY:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Capacity);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.PRICE:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Price);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.DISCOUNT:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.Discount);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.PUBLICATION:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.IsPublished);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.UpdatedAt);
                    break;

                case VEHICLE_SORTING_OPTION_REQUEST_DTO.CREATION:
                    vehiclesQuery = vehiclesQuery.OrderByDescending(vehicle => vehicle.CreatedAt);
                    break;
            }
        }

        vehiclesQuery = vehiclesQuery
        .Skip(vehicleFiltration.Pagination.RequestedPage)
        .Take((int)vehicleFiltration.Pagination.RecordsPerRequest);

        var vehicles = await vehiclesQuery
        .AsNoTracking()
        .GroupJoin(
            _AppDBContext.VehicleImages
            .Where(vehicleImage =>
                vehicleImage.IsPublished == true
                && vehicleImage.IsDeleted == false
            ),
            vehicle => vehicle.ID,
            vehicleImage => vehicleImage.VehicleID,
            (vehicle, vehicleImages) => new Tuple<VehicleEntity, IEnumerable<VehicleImageEntity>>(vehicle, vehicleImages)
        )
        .GroupJoin(
            _AppDBContext.VehicleInstances
            .Where(vehicleInstance =>
                 vehicleInstance.IsDeleted == false
            ),
            tuple => tuple.Item1.ID,
            vehicleInstance => vehicleInstance.VehicleID,
            (tuple, vehicleInstances) => new Tuple<VehicleEntity, IEnumerable<VehicleImageEntity>, IEnumerable<VehicleInstanceEntity>>(tuple.Item1, tuple.Item2, vehicleInstances)
        )
        .Select(tuple => new VehicleEntityDTO(tuple.Item1, tuple.Item2, tuple.Item3)).ToArrayAsync();

        return new(
            vehicles,
            new(vehicleTotalRecords, vehicleFiltration.Pagination.RecordsPerRequest, vehicleFiltration.Pagination.RequestedPage)
        );
    }
};
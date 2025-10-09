using Microsoft.EntityFrameworkCore;
using DataAccess.User.DTOs.Responses;
using DataAccess.User.DTOs.Requests.Filters;
using DataAccess.Entities;

namespace DataAccess.User.Repositories;

public class VehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public VehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneDTO<VehicleDTO>> GetOneAsync(Guid vehicleUUID)
    {
        var vehicleQuery = _AppDBContext.Vehicles
        .Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo)
        .Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner)
        .Where(vehicle => vehicle.Partner.IsDeleted == false)
        .Include(vehicle => vehicle.Thumbnail)
        .Where(vehicle => vehicle.IsPublished == true && vehicle.IsDeleted == false)
        .Where(vehicle => vehicle.UUID == vehicleUUID)
        .GroupJoin(
            _AppDBContext.VehicleImages
            .Include(vehicleImage => vehicleImage.Image)
            .Where(vehicleImage =>
                vehicleImage.IsPublished == true
                && vehicleImage.IsDeleted == false
            ),
            vehicle => vehicle.UUID,
            vehicleImages => vehicleImages.UUID,
            (vehicle, vehicleImages) => new
            {
                entity = vehicle,
                images = vehicleImages
            }
        )
        .GroupJoin(
            _AppDBContext.VehicleColors
            .Where(vehicleInstance => vehicleInstance.IsPublished == true && vehicleInstance.IsDeleted == false),
            vehicle => vehicle.entity.UUID,
            vehicleColor => vehicleColor.UUID,
            (vehicle, vehicleColors) => new
            {
                entity = vehicle.entity,
                images = vehicle.images,
                colors = vehicleColors
            }
        );

        var vehicle = await vehicleQuery
        .AsNoTracking()
        .Select(vehicle => new VehicleDTO(vehicle.entity, vehicle.images, vehicle.colors)).FirstOrDefaultAsync()
        ?? throw new ExceptionDTO(STATUS_CODE.NOT_FOUND, "No such vehicle.");

        return new SuccessOneDTO<VehicleDTO>(vehicle);
    }

    public async Task<SuccessManyDTO<VehicleDTO>> GetManyAsync(VehicleFiltersDTO filters, PaginationFilterDTO pagination)
    {
        var vehicleQuery = _AppDBContext.Vehicles.AsQueryable();
        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo);
        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner);
        vehicleQuery = vehicleQuery.Where(vehicle => vehicle.Partner.IsDeleted == false);

        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Thumbnail);

        vehicleQuery = vehicleQuery.Where(vehicle => vehicle.IsPublished == true && vehicle.IsDeleted == false);
        vehicleQuery = filters.Apply(vehicleQuery);

        var vehicleGroupJoinQuery = vehicleQuery
        .GroupJoin(
            _AppDBContext.VehicleImages
            .Include(vehicleImage => vehicleImage.Image)
            .Where(vehicleImage =>
                vehicleImage.IsPublished == true
                && vehicleImage.IsDeleted == false
            ),
            vehicle => vehicle.UUID,
            vehicleImages => vehicleImages.UUID,
            (vehicle, vehicleImages) => new
            {
                entity = vehicle,
                images = vehicleImages
            }
        )
        .GroupJoin(
            _AppDBContext.VehicleColors
            .Where(vehicleInstance => vehicleInstance.IsPublished == true && vehicleInstance.IsDeleted == false),
            vehicle => vehicle.entity.UUID,
            vehicleColor => vehicleColor.UUID,
            (vehicle, vehicleColors) => new
            {
                entity = vehicle.entity,
                images = vehicle.images,
                colors = vehicleColors
            }
        );

        vehicleGroupJoinQuery = pagination.Apply(vehicleGroupJoinQuery);
        var totalItems = await vehicleGroupJoinQuery.CountAsync();

        var vehicles = await vehicleGroupJoinQuery.AsNoTracking()
        .Select(vehicle => new VehicleDTO(vehicle.entity, vehicle.images, vehicle.colors)).ToArrayAsync();

        return new SuccessManyDTO<VehicleDTO>(vehicles, new PaginationDTO(pagination.Page.Value, (int)pagination.PageSize.Value, totalItems));
    }
};
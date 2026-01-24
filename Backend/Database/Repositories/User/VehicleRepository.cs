using Microsoft.EntityFrameworkCore;

using Database.Entities;

using Database.Parameters;
using Database.Parameters.User;

using Database.DTOs.User;
using Database.DTOs;

namespace Database.Repositories.User;

public class VehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public VehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<ClsSuccessDTO<ClsVehicleModelDTO>> GetOneAsync(Guid vehicleUUID)
    {
        var vehicleQuery = _AppDBContext.VehicleModels.AsQueryable();
        vehicleQuery = vehicleQuery.Where(vehicle => vehicle.UUID == vehicleUUID);

        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo);
        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner);
        vehicleQuery = vehicleQuery.Where(vehicle => vehicle.Partner.IsDeleted == false);

        vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Thumbnail);
        vehicleQuery = vehicleQuery.Where(vehicle => vehicle.Status == VehicleModelEntity.STATUS.ACTIVE && vehicle.IsDeleted == false);

        var vehicle = await vehicleQuery.AsNoTracking().FirstOrDefaultAsync()
        ?? throw new ClsExceptionDTO(HTTP_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        var vehicleImagesQuery = _AppDBContext.VehicleModelGallery.AsQueryable();
        vehicleImagesQuery = vehicleImagesQuery.Include(vehicleImage => vehicleImage.Url);
        vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.VehicleModelUUID == vehicleUUID);
        vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.IsDeleted == false);
        vehicleImagesQuery = vehicleImagesQuery.OrderBy(vehicleImage => vehicleImage.Index);

        var vehicleImages = await vehicleImagesQuery.AsNoTracking()
        .Select(vehicleImage => vehicleImage).ToArrayAsync();

        var vehicleColorsQuery = _AppDBContext.VehicleModelColors.AsQueryable();
        vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.VehicleModelUUID == vehicleUUID);
        vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.IsDeleted == false);

        var vehicleColors = await vehicleColorsQuery.AsNoTracking().ToArrayAsync();

        var vehicleDTO = new ClsVehicleModelDTO(
            vehicle,
            vehicleImages,
            vehicleColors
        );

        return new ClsSuccessDTO<ClsVehicleModelDTO>(vehicleDTO);
    }

    public async Task<ClsPaginationSuccessDTO<ClsVehicleModelDTO>> GetManyAsync(VehicleFiltersParameter filters, PaginationParameter pagination)
    {
        var vehiclesQuery = _AppDBContext.VehicleModels.AsQueryable();

        vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo);
        vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner);
        vehiclesQuery = vehiclesQuery.Where(vehicle => vehicle.Partner.IsDeleted == false);

        vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Thumbnail);

        vehiclesQuery = vehiclesQuery.Where(vehicle => vehicle.Status == VehicleModelEntity.STATUS.ACTIVE && vehicle.IsDeleted == false);
        vehiclesQuery = filters.Apply(vehiclesQuery);

        vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.CreatedAt);

        var totalItems = await vehiclesQuery.CountAsync();
        vehiclesQuery = vehiclesQuery
        .Skip(pagination.Skip())
        .Take(pagination.Take());

        var vehicles = await vehiclesQuery.AsNoTracking().ToArrayAsync();
        var vehicleUUIDs =
        new HashSet<Guid>(vehicles.Select(vehicle => vehicle.UUID));

        var vehicleImagesQuery = _AppDBContext.VehicleModelGallery.AsQueryable();
        vehicleImagesQuery = vehicleImagesQuery.Include(vehicleImage => vehicleImage.Url);
        vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleUUIDs.Contains(vehicleImage.VehicleModelUUID));
        vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.IsDeleted == false);
        vehicleImagesQuery = vehicleImagesQuery.OrderBy(vehicleImage => vehicleImage.Index);

        var vehicleColorsQuery = _AppDBContext.VehicleModelColors.AsQueryable();
        vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleUUIDs.Contains(vehicleColor.VehicleModelUUID));
        vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.IsDeleted == false);

        var vehicleImagesTask = vehicleImagesQuery.AsNoTracking().ToArrayAsync();
        var vehicleColorsTask = vehicleColorsQuery.AsNoTracking().ToArrayAsync();
        await Task.WhenAll([vehicleImagesTask, vehicleColorsTask]);

        var vehicleImages = vehicleImagesTask.Result.GroupBy(vehicleImage => vehicleImage.VehicleModelUUID).ToDictionary(g => g.Key, g => g.ToArray());
        var vehicleColors = vehicleColorsTask.Result.GroupBy(vehicleColor => vehicleColor.VehicleModelUUID).ToDictionary(g => g.Key, g => g.ToArray());


        var vehiclesDTO = vehicles.Select(vehicle =>
        {
            vehicleImages.TryGetValue(vehicle.UUID, out var images);
            vehicleColors.TryGetValue(vehicle.UUID, out var colors);

            return new ClsVehicleModelDTO(vehicle, images ?? [], colors ?? []);
        }).ToArray();

        return new ClsPaginationSuccessDTO<ClsVehicleModelDTO>(vehiclesDTO, new ClsPaginationDTO(pagination.Page, (int)pagination.Limit, totalItems));
    }
};
namespace Database.Repositories.Partner;

public class VehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public VehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }
    
    /** TODO:
        1. GetOne
        2. GetMany
        3. Add
        4. Update
        5. Delete
    */

    // public async Task<SuccessOneDTO<VehicleDTO>> GetOneAsync(Guid vehicleUUID)
    // {
    //     var vehicleQuery = _AppDBContext.Vehicles.AsQueryable();
    //     vehicleQuery = vehicleQuery.Where(vehicle => vehicle.UUID == vehicleUUID);

    //     vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo);
    //     vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner);
    //     vehicleQuery = vehicleQuery.Where(vehicle => vehicle.Partner.IsDeleted == false);

    //     vehicleQuery = vehicleQuery.Include(vehicle => vehicle.Thumbnail);
    //     vehicleQuery = vehicleQuery.Where(vehicle => vehicle.IsPublished == true && vehicle.IsDeleted == false);

    //     var vehicle = await vehicleQuery.AsNoTracking().FirstOrDefaultAsync()
    //     ?? throw new ExceptionDTO(STATUS_CODE.NOT_FOUND, "No such vehicle.");

    //     var vehicleImagesQuery = _AppDBContext.VehicleImages.AsQueryable();
    //     vehicleImagesQuery = vehicleImagesQuery.Include(vehicleImage => vehicleImage.Image);
    //     vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.VehicleUUID == vehicleUUID);
    //     vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.IsPublished == true && vehicleImage.IsDeleted == false);

    //     var vehicleImages = await vehicleImagesQuery.AsNoTracking()
    //     .Select(vehicleImage => vehicleImage.Image).ToArrayAsync();

    //     var vehicleColorsQuery = _AppDBContext.VehicleColors.AsQueryable();
    //     vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.VehicleUUID == vehicleUUID);
    //     vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.IsPublished == true && vehicleColor.IsDeleted == false);

    //     var vehicleColors = await vehicleColorsQuery.AsNoTracking().ToArrayAsync();

    //     var vehicleDTO = new VehicleDTO(
    //         vehicle,
    //         vehicleImages,
    //         vehicleColors
    //     );

    //     return new SuccessOneDTO<VehicleDTO>(vehicleDTO);
    // }

    // public async Task<SuccessManyDTO<VehicleDTO>> GetManyAsync(VehicleFiltersParameter filters, PaginationParameter pagination)
    // {
    //     var vehiclesQuery = _AppDBContext.Vehicles.AsQueryable();

    //     vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Logo);
    //     vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Partner).ThenInclude(partner => partner.Banner);
    //     vehiclesQuery = vehiclesQuery.Where(vehicle => vehicle.Partner.IsDeleted == false);

    //     vehiclesQuery = vehiclesQuery.Include(vehicle => vehicle.Thumbnail);

    //     vehiclesQuery = vehiclesQuery.Where(vehicle => vehicle.IsPublished == true && vehicle.IsDeleted == false);
    //     vehiclesQuery = filters.Apply(vehiclesQuery);

    //     vehiclesQuery = vehiclesQuery.OrderBy(vehicle => vehicle.CreatedAt);

    //     var totalItems = await vehiclesQuery.CountAsync();
    //     vehiclesQuery = vehiclesQuery
    //     .Skip(pagination.Skip())
    //     .Take(pagination.Take());

    //     var vehicles = await vehiclesQuery.AsNoTracking().ToArrayAsync();
    //     var vehicleUUIDs =
    //     new HashSet<Guid>(vehicles.Select(vehicle => vehicle.UUID));

    //     var vehicleImagesQuery = _AppDBContext.VehicleImages.AsQueryable();
    //     vehicleImagesQuery = vehicleImagesQuery.Include(vehicleImage => vehicleImage.Image);

    //     vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleUUIDs.Contains(vehicleImage.VehicleUUID));
    //     vehicleImagesQuery = vehicleImagesQuery.Where(vehicleImage => vehicleImage.IsPublished == true && vehicleImage.IsDeleted == false);

    //     var vehicleUUIDsImages = new Dictionary<Guid, VehicleImageEntity>();
    //     var vehicleImages = await vehicleImagesQuery.AsNoTracking().ToArrayAsync();

    //     var vehicleColorsQuery = _AppDBContext.VehicleColors.AsQueryable();

    //     vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleUUIDs.Contains(vehicleColor.VehicleUUID));
    //     vehicleColorsQuery = vehicleColorsQuery.Where(vehicleColor => vehicleColor.IsPublished == true && vehicleColor.IsDeleted == false);

    //     var vehicleColors = await vehicleColorsQuery.AsNoTracking().ToArrayAsync();

    //     var vehiclesDTO = vehicles.Select(vehicle => new VehicleDTO(
    //     vehicle,
    //     vehicleImages.Where(vehicleImage => vehicleImage.VehicleUUID == vehicle.UUID).Select(vehicleImage => vehicleImage.Image).ToArray(),
    //     vehicleColors.Where(vehicleColor => vehicleColor.VehicleUUID == vehicle.UUID).ToArray()
    //     )).ToArray();

    //     return new SuccessManyDTO<VehicleDTO>(vehiclesDTO, new PaginationDTO(pagination.Page, (int)pagination.Limit, totalItems));
    // }
};
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories.UserRepository;

public class UserVehicleRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserVehicleRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessResponseDTO<VehicleEntityDTO>> GetAsync(int vehicleID)
    {
        var query = _AppDBContext.Vehicles
        .AsNoTracking()
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.IsPublished == true
            && vehicle.IsDeleted == false
        )
        .GroupJoin(
            _AppDBContext.VehicleImages
            .Include(vehicleImage => vehicleImage.Image)
            .Where(vehicleImage =>
                vehicleImage.IsPublished == true
                && vehicleImage.IsDeleted == false
            ),
            vehicle => vehicle.ID,
            vehicleImage => vehicleImage.VehicleID,
            (vehicle, vehicleImages) => new { vehicle, vehicleImages }
        )
        .GroupJoin(
            _AppDBContext.VehicleInstances
            .Include(vehicleInstance => vehicleInstance.Color)
            .Where(vehicleInstance =>
                vehicleInstance.IsPublished == true
                && vehicleInstance.IsDeleted == false
            ),
            v_vI => v_vI.vehicle.ID,
            vehicleInstance => vehicleInstance.VehicleID,
            (v_vI, vehicleInstances) => new { v_vI, vehicleInstances }
        );

        var data = await query.FirstOrDefaultAsync()
        ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        var vehicle = new VehicleEntityDTO(data.v_vI.vehicle, data.v_vI.vehicleImages, data.vehicleInstances);
        return new(vehicle);
    }
};
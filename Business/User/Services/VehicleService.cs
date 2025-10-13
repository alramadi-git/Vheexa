using DataAccess.User.Repositories;
using DataAccess.User.DTOs.Requests.Filters;
using DataAccess.User.DTOs.Responses;

namespace Business.User.Services;

public class VehicleService
{
    private readonly VehicleRepository _VehicleRepository;

    public VehicleService(VehicleRepository VehicleRepository)
    {
        _VehicleRepository = VehicleRepository;
    }

    public async Task<SuccessOneDTO<VehicleDTO>> GetOneAsync(Guid vehicleUUID)
    {
        return await _VehicleRepository.GetOneAsync(vehicleUUID);
    }

    public async Task<SuccessManyDTO<VehicleDTO>> GetManyAsync(VehicleFiltersDTO filters, PaginationFilterDTO pagination)
    {
        return await _VehicleRepository.GetManyAsync(filters, pagination);
    }
};
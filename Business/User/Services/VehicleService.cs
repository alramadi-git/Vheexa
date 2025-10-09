using Microsoft.EntityFrameworkCore;
using DataAccess.User.DTOs.Responses;
using DataAccess.User.DTOs.Requests.Filters;
using DataAccess.Entities;
using DataAccess;
using DataAccess.User.Repositories;

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
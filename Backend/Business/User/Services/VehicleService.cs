using Database.DTOs;
using Database.Parameters;
using Business.User.Validations;
using FluentValidation;
using Business.Validations;
using Database.DTOs.User;
using Database.Parameters.User;
using Database.Repositories.User;

namespace Business.User.Services;

public class VehicleService
{
    private readonly VehicleFiltersValidation _VehicleFiltersValidation;
    private readonly PaginationValidation _PaginationValidation;

    private readonly VehicleRepository _VehicleRepository;

    public VehicleService(VehicleFiltersValidation vehicleFiltersValidation, PaginationValidation paginationValidation, VehicleRepository vehicleRepository)
    {
        _VehicleFiltersValidation = vehicleFiltersValidation;
        _PaginationValidation = paginationValidation;
        _VehicleRepository = vehicleRepository;
    }

    public async Task<SuccessOneDTO<VehicleDTO>> GetOneAsync(Guid vehicleUUID)
    {
        return await _VehicleRepository.GetOneAsync(vehicleUUID);
    }

    public async Task<SuccessManyDTO<VehicleDTO>> GetManyAsync(VehicleFiltersParameter filters, PaginationParameter pagination)
    {
        await _VehicleFiltersValidation.ValidateAndThrowAsync(filters);
        await _PaginationValidation.ValidateAndThrowAsync(pagination);

        return await _VehicleRepository.GetManyAsync(filters, pagination);
    }
};
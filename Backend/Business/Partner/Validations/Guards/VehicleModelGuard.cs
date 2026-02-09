using Business.Validations.Validators;
using Business.Partner.Validations.Validators;
using Business.Partner.Inputs;
using Business.Filters;
using Business.Partner.Filters;

namespace Business.Partner.Validations.Guards;

public class ClsVehicleModelGuard
{
    private readonly ClsVehicleModelInputValidator _VehicleModelCreateValidator;
    private readonly ClsVehicleModelFilterValidator _VehicleModelFilterValidator;

    private readonly ClsPaginationFilterValidator _PaginationValidator;

    public ClsVehicleModelGuard(
        ClsVehicleModelInputValidator vehicleModelCreateValidator,
        ClsVehicleModelFilterValidator vehicleModelFilterValidator,
        ClsPaginationFilterValidator paginationValidator
    )
    {
        _VehicleModelCreateValidator = vehicleModelCreateValidator;
        _VehicleModelFilterValidator = vehicleModelFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsVehicleModelInput vehicleModel)
    {
        await _VehicleModelCreateValidator.ValidateAsync(vehicleModel);
    }
    public async Task SearchAsync(ClsVehicleModelFilter filter, ClsPaginationFilter pagination)
    {
        await _VehicleModelFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}
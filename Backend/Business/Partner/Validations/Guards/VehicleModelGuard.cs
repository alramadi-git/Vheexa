using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsVehicleModelGuard
{
    private readonly ClsVehicleModelCreateValidator _VehicleModelCreateValidator;
    private readonly ClsVehicleModelFilterValidator _VehicleModelFilterValidator;

    private readonly ClsPaginationValidator _PaginationValidator;

    public ClsVehicleModelGuard(
        ClsVehicleModelCreateValidator vehicleModelCreateValidator,
        ClsVehicleModelFilterValidator vehicleModelFilterValidator,
        ClsPaginationValidator paginationValidator
    )
    {
        _VehicleModelCreateValidator = vehicleModelCreateValidator;
        _VehicleModelFilterValidator = vehicleModelFilterValidator;

        _PaginationValidator = paginationValidator;
    }

    public async Task CreateOneAsync(ClsVehicleModelCreateInput vehicleModel)
    {
        await _VehicleModelCreateValidator.ValidateAsync(vehicleModel);
    }
    public async Task SearchAsync(ClsVehicleModelFilterInput filter, ClsPaginationInput pagination)
    {
        await _VehicleModelFilterValidator.ValidateAsync(filter);
        await _PaginationValidator.ValidateAsync(pagination);
    }
}
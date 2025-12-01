using FluentValidation;
using Database.Parameters.User;

namespace Business.User.Validations;

public class VehicleFiltersValidation : AbstractValidator<VehicleFiltersParameter>
{
    public VehicleFiltersValidation()
    {
        RuleFor(vehicleFilters => vehicleFilters.MinCapacity.Value).GreaterThanOrEqualTo(0);
        RuleFor(vehicleFilters => vehicleFilters.MaxCapacity.Value).GreaterThanOrEqualTo(0);

        RuleFor(vehicleFilters => vehicleFilters)
        .Must((vehicleFilters) => vehicleFilters.MinCapacity.Value <= vehicleFilters.MaxCapacity.Value)
        .When(vehicleFilters => vehicleFilters.MinCapacity.Value != 0 && vehicleFilters.MaxCapacity.Value != 0)
        .WithMessage("MinCapacity should be less than or equal to MaxCapacity.");

        RuleFor(vehicleFilters => vehicleFilters.MinPrice.Value).GreaterThanOrEqualTo(0);
        RuleFor(vehicleFilters => vehicleFilters.MaxPrice.Value).GreaterThanOrEqualTo(0);

        RuleFor(vehicleFilters => vehicleFilters)
        .Must((vehicleFilters) => vehicleFilters.MinPrice.Value <= vehicleFilters.MaxPrice.Value)
        .When(vehicleFilters => vehicleFilters.MinPrice.Value != 0 && vehicleFilters.MaxPrice.Value != 0)
        .WithMessage("MinPrice should be less than or equal to MaxPrice.");
    }
}
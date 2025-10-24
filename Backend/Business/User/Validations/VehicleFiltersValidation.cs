using FluentValidation;
using Database.User.Parameters;

namespace Business.User.Validations;

public class VehicleFiltersValidation : AbstractValidator<VehicleFiltersParameter>
{
    public VehicleFiltersValidation()
    {
        RuleFor(vehicleFilters => vehicleFilters.Search.Value)
        .NotEmpty().When(vehicleFilters => vehicleFilters.Search != null).WithMessage("Search should not be empty when search is not null.");

        RuleFor(vehicleFilters => vehicleFilters.Transmission.Value)
        .NotEmpty().When(vehicleFilters => vehicleFilters.Transmission != null).WithMessage("Transmission should not be empty when transmission is not null.");

        RuleFor(vehicleFilters => vehicleFilters.Fuel.Value)
        .NotEmpty().When(vehicleFilters => vehicleFilters.Fuel != null).WithMessage("Fuel should not be empty when fuel is not null.");

        RuleFor(vehicleFilters => vehicleFilters.MinCapacity.Value)
        .GreaterThan(0).When(vehicleFilters => vehicleFilters.MinCapacity != null).WithMessage("MinCapacity should be greater than 0 when minCapacity is not null.");

        RuleFor(vehicleFilters => vehicleFilters.MaxCapacity.Value)
        .GreaterThan(0).When(vehicleFilters => vehicleFilters.MaxCapacity != null).WithMessage("MaxCapacity should be greater than 0 when maxCapacity is not null.");

        RuleFor(vehicleFilters => vehicleFilters)
        .Must((vehicleFilters) => vehicleFilters.MinCapacity.Value <= vehicleFilters.MaxCapacity.Value)
        .When(vehicleFilters => vehicleFilters.MinCapacity != null && vehicleFilters.MaxCapacity != null)
        .WithMessage("MinCapacity should be less than or equal to MaxCapacity.");

        RuleFor(vehicleFilters => vehicleFilters.MinPrice.Value)
        .GreaterThan(0).When(vehicleFilters => vehicleFilters.MinPrice != null).WithMessage("MinPrice should be greater than 0 when minPrice is not null.");

        RuleFor(vehicleFilters => vehicleFilters.MaxPrice.Value)
        .GreaterThan(0).When(vehicleFilters => vehicleFilters.MaxPrice != null).WithMessage("MaxPrice should be greater than 0 when maxPrice is not null.");

        RuleFor(vehicleFilters => vehicleFilters)
        .Must((vehicleFilters) => vehicleFilters.MinPrice.Value <= vehicleFilters.MaxPrice.Value)
        .When(vehicleFilters => vehicleFilters.MinPrice != null && vehicleFilters.MaxPrice != null)
        .WithMessage("MinPrice should be less than or equal to MaxPrice.");
    }
}
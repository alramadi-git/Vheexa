using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.FiltersRequestDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations;

public static class LocationValidation
{
    public static IRuleBuilderOptions<T, LocationCreateRequestDTO> LocationCreate<T>(this IRuleBuilder<T, LocationCreateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(location => location
            .RuleFor(location => location.Country)
            .NotEmpty().WithMessage("Country is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.City)
            .NotEmpty().WithMessage("City is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Street)
            .NotEmpty().WithMessage("Street is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.")
        );
    }

    public static IRuleBuilderOptions<T, LocationsFiltersRequestDTO> LocationsFilters<T>(this IRuleBuilder<T, LocationsFiltersRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(location => location
            .RuleFor(location => location.Country)
            .NotEmpty().When(a => a.Country != null).WithMessage("Country is invalid.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.City)
            .NotEmpty()
            .When(a => a.City != null).WithMessage("City is invalid.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Street)
            .NotEmpty()
            .When(a => a.Street != null).WithMessage("Street is invalid.")
        );
    }

    public static IRuleBuilderOptions<T, LocationUpdateRequestDTO> LocationUpdate<T>(this IRuleBuilder<T, LocationUpdateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(location => location
            .RuleFor(location => location.Country)
            .NotEmpty().WithMessage("Country is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.City)
            .NotEmpty().WithMessage("City is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Street)
            .NotEmpty().WithMessage("Street is required.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Latitude)
            .InclusiveBetween(-90, 90).WithMessage("Latitude must be between -90 and 90.")
        )
        .ChildRules(location => location
            .RuleFor(location => location.Longitude)
            .InclusiveBetween(-180, 180).WithMessage("Longitude must be between -180 and 180.")
        );
    }
}

using FluentValidation;

namespace Business.Validations.Human;

public abstract class HumanFilterValidation<T> : AbstractValidator<T> where T : DataAccess.Modules.Filters.Abstractions.HumanFilters
{
    public HumanFilterValidation()
    {
        /** Address */
        RuleFor(filter => filter.Address.Country)
        .NotEmpty()
        .When(filter => filter.Address?.Country != null);

        RuleFor(filter => filter.Address.City)
        .NotEmpty()
        .When(filter => filter.Address?.City != null);

        RuleFor(filter => filter.Address.Street)
        .NotEmpty()
        .When(filter => filter.Address?.Street != null);

        /** Name */
        RuleFor(filter => filter.FirstName)
        .NotEmpty()
        .When(filter => filter.FirstName != null);

        RuleFor(filter => filter.MidName)
        .NotEmpty()
        .When(filter => filter.MidName != null);

        RuleFor(filter => filter.LastName)
        .NotEmpty()
        .When(filter => filter.LastName != null);

        /** Date Of Birth */
        RuleFor(filter => filter)
        .Must(filter => filter.MinDateOfBirth <= filter.MaxDateOfBirth)
        .When(filter => filter.MinDateOfBirth != null && filter.MaxDateOfBirth != null);

        /** Phone Number */
        RuleFor(filter => filter.PhoneNumber)
        .NotEmpty()
        .When(filter => filter.PhoneNumber != null);

        /** Email */
        RuleFor(filter => filter.Email)
        .NotEmpty()
        .When(filter => filter.Email != null);
    }
}
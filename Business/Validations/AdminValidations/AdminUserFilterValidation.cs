using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations.AdminValidations;

public class AdminUserFilterValidation : AbstractValidator<UserFiltersRequestDTO>
{
    public AdminUserFilterValidation()
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

        /** Average Rates */
        RuleFor(filter => filter.MinAverageRates)
        .InclusiveBetween(0, 5)
        .When(filter => filter.MinAverageRates != null);

        RuleFor(filter => filter.MaxAverageRates)
        .InclusiveBetween(0, 5)
        .When(filter => filter.MaxAverageRates != null);

        RuleFor(filter => filter.MinAverageRates)
        .LessThanOrEqualTo((filter) => filter.MaxAverageRates)
        .When(filter => filter.MinAverageRates != null && filter.MaxAverageRates != null);

        /** Deleted */
        RuleFor(filter => filter.DeletedBefore)
        .LessThanOrEqualTo((filter) => filter.DeletedAfter)
        .When(filter => filter.DeletedBefore != null && filter.DeletedAfter != null);

        /** Updated */
        RuleFor(filter => filter.UpdatedBefore)
        .LessThanOrEqualTo((filter) => filter.UpdatedAfter)
        .When(filter => filter.UpdatedBefore != null && filter.UpdatedAfter != null);

        /** Created */
        RuleFor(filter => filter.CreatedBefore)
        .LessThanOrEqualTo((filter) => filter.CreatedAfter)
        .When(filter => filter.CreatedBefore != null && filter.CreatedAfter != null);
    }
}
using FluentValidation;

using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace Business.Validations.UserValidations;

public class UserFilterValidation : AbstractValidator<UsersFiltersRequestDTO>
{
    public UserFilterValidation()
    {
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
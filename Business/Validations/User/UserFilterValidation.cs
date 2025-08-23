using FluentValidation;

using Business.Validations.Human;
using DataAccess.Modules.Filters;

namespace Business.Validations.User;

public class UserFilterValidation : HumanFilterValidation<UserFilter>
{
    public UserFilterValidation() : base()
    {
        /** Average Rates */
        RuleFor(filter => filter.MinAverageRates)
        .GreaterThanOrEqualTo(0)
        .When(filter => filter.MinAverageRates != null);

        RuleFor(filter => filter.MaxAverageRates)
        .LessThanOrEqualTo(5)
        .When(filter => filter.MaxAverageRates != null);

        RuleFor(filter => filter)
        .Must(filter => filter.MinAverageRates <= filter.MaxAverageRates)
        .When(filter => filter.MinAverageRates != null && filter.MaxAverageRates != null);

        /** Deleted */
        RuleFor(filter => filter)
        .Must(filter => filter.DeletedBefore <= filter.DeletedAfter)
        .When(filter => filter.DeletedBefore != null && filter.DeletedAfter != null && filter.IsDeleted == true);

        /** Updated */
        RuleFor(filter => filter)
        .Must(filter => filter.UpdatedBefore <= filter.UpdatedAfter)
        .When(filter => filter.UpdatedBefore != null && filter.UpdatedAfter != null);

        /** Created */
        RuleFor(filter => filter)
        .Must(filter => filter.CreatedBefore <= filter.CreatedAfter)
        .When(filter => filter.CreatedBefore != null && filter.CreatedAfter != null);
    }
}
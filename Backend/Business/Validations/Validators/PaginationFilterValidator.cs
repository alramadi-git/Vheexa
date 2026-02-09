using FluentValidation;

using Business.Filters;

namespace Business.Validations.Validators;

public class ClsPaginationFilterValidator : AbstractValidator<ClsPaginationFilter>
{
    public ClsPaginationFilterValidator()
    {
        RuleFor(pagination => pagination.Page)
        .GreaterThanOrEqualTo(1);

        RuleFor(pagination => pagination.PageSize)
        .IsInEnum();
    }
}

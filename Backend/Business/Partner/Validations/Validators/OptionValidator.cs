using FluentValidation;

using Business.Partner.Filters;

namespace Business.Partner.Validations.Validators;

public class ClsOptionFilterValidator : AbstractValidator<ClsOptionFilterFilter>
{
    public ClsOptionFilterValidator()
    {
        RuleFor(memberFilter => memberFilter.Search)
        .NotEmpty()
        .MaximumLength(256)
        .When(memberFilter => memberFilter.Search != null);
    }
}

public class ClsOptionPaginationFilterValidator : AbstractValidator<ClsOptionPaginationFilter>
{
    public ClsOptionPaginationFilterValidator()
    {
        RuleFor(memberFilter => memberFilter.Page)
        .GreaterThanOrEqualTo(1);
    }
}
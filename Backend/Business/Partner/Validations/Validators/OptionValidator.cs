using FluentValidation;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsOptionFilterValidator : AbstractValidator<ClsOptionFilterInput>
{
    public ClsOptionFilterValidator()
    {
        RuleFor(memberFilter => memberFilter.Search)
        .NotEmpty()
        .MaximumLength(256)
        .When(memberFilter => memberFilter.Search != null);
    }
}

public class ClsOptionPaginationValidator : AbstractValidator<ClsOptionPaginationInput>
{
    public ClsOptionPaginationValidator()
    {
        RuleFor(memberFilter => memberFilter.Page)
        .GreaterThanOrEqualTo(1);
    }
}
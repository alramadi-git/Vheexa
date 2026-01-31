using FluentValidation;

using Business.Inputs;

namespace Business.Validations.Validators;

public class ClsPaginationValidator : AbstractValidator<ClsPaginationInput>
{
    public ClsPaginationValidator()
    {
        RuleFor(pagination => pagination.Page)
        .GreaterThanOrEqualTo(1);

        RuleFor(pagination => pagination.PageSize)
        .IsInEnum();
    }
}

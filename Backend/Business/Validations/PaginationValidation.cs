using FluentValidation;
using Database.Parameters;

namespace Business.Validations;

public class PaginationValidation : AbstractValidator<PaginationParameter>
{
    public PaginationValidation()
    {
        RuleFor(pagination => pagination.Page)
        .GreaterThanOrEqualTo(1)
        .WithMessage("Page must be greater than or equal to 1.");

        RuleFor(pagination => pagination.Limit)
        .IsInEnum().WithMessage("Limit must be a valid enum value.");
    }
}
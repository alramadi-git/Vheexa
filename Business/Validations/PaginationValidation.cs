using FluentValidation;

using DataAccess.Modules.Filters;

namespace Business.Validations;

public class PaginationValidation : AbstractValidator<PaginationFilters>
{
    public static readonly List<int> Options = [25, 50, 75, 100];

    public PaginationValidation()
    {
        RuleFor(pagination => pagination.Skip)
        .GreaterThanOrEqualTo(0).WithMessage("Skip must be greater than or equal to 0.");


        RuleFor(pagination => pagination.Take)
        .EqualToOptions(Options).WithMessage("Take must be one of the following values: 25, 50, 75, 100.");
    }
}
using FluentValidation;
using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace Business.Validations;

public class PaginationValidation : AbstractValidator<PaginationFiltersRequestDTO>
{
    private static Lazy<PaginationValidation> _Instance = new(() => new());
    public static PaginationValidation Instance => _Instance.Value;

    private PaginationValidation()
    {
        RuleFor(pagination => pagination.RequestedPage)
        .GreaterThanOrEqualTo(0).WithMessage("Skip must be greater than or equal to 0.");
    }
}
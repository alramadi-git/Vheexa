using FluentValidation;
using DataAccess.RequestDTOs;

namespace Business.Validations;

public class PaginationValidation : AbstractValidator<PaginationRequestDTO>
{
    private static Lazy<PaginationValidation> _Instance = new(() => new());
    public static PaginationValidation Instance => _Instance.Value;

    private PaginationValidation()
    {
        RuleFor(pagination => pagination.RequestedPage)
        .GreaterThanOrEqualTo(0).WithMessage("Skip must be greater than or equal to 0.");
    }
}
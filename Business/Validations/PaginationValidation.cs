using FluentValidation;
using DataAccess.RequestDTOs;

namespace Business.Validations;

public class PaginationValidation : AbstractValidator<PaginationRequestDTO>
{
    public PaginationValidation()
    {
        RuleFor(pagination => pagination.RequestedPage)
        .GreaterThanOrEqualTo(0).WithMessage("Skip must be greater than or equal to 0.");
    }
}
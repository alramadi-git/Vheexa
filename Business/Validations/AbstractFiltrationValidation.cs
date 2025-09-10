using FluentValidation;

using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace Business.Validations;

public abstract class AbstractFiltrationValidation<T, T_SORTING_OPTION> : AbstractValidator<T>
where T : AbstractFiltrationRequestDTO<T_SORTING_OPTION>
where T_SORTING_OPTION : Enum
{
    public AbstractFiltrationValidation()
    {
        RuleFor(filter => filter.Pagination.RequestedPage)
        .GreaterThanOrEqualTo(1).WithMessage("Requested page must be at least 1.");
    }
}
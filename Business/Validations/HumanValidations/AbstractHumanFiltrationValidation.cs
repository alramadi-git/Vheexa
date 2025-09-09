using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations.HumanValidations;

public abstract class AbstractHumanFiltrationValidation<T, T_SORTING_OPTION> : AbstractFiltrationValidation<T, T_SORTING_OPTION>
where T : AbstractHumanFiltrationRequestDTO<T_SORTING_OPTION>
where T_SORTING_OPTION : Enum
{
    public AbstractHumanFiltrationValidation()
    {
        RuleFor(filter => filter.MinDateOfBirth)
        .LessThanOrEqualTo((filter) => filter.MaxDateOfBirth)
        .When(filter => filter.MinDateOfBirth != null && filter.MaxDateOfBirth != null);
    }
}
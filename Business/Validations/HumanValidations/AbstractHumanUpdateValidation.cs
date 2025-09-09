using FluentValidation;

using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations.HumanValidations;

public abstract class AbstractHumanUpdateValidation<T> : AbstractValidator<AbstractHumanUpdateRequestDTO>
where T : AbstractHumanUpdateRequestDTO
{
    public AbstractHumanUpdateValidation()
    {
        RuleFor(human => human.Image)
        .ImageUpdate();

        RuleFor(human => human.Location)
        .LocationUpdate();

        RuleFor(human => human.FirstName)
        .Username().WithMessage("First name must be between 3 and 15 characters.");

        RuleFor(human => human.MidName)
        .Username().WithMessage("Mid name must be between 3 and 15 characters.");

        RuleFor(human => human.LastName)
        .Username().WithMessage("Last name must be between 3 and 15 characters.");

        RuleFor(human => human.DateOfBirth)
        .DateOfBirth();

        RuleFor(human => human.PhoneNumber)
        .PhoneNumber();

        RuleFor(human => human.Email)
        .EmailAddress();
    }
};
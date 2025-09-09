using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace Business.Validations.HumanValidations;

public abstract class AbstractHumanCreateValidation<T> : AbstractValidator<AbstractHumanCreateRequestDTO>
where T : AbstractHumanCreateRequestDTO
{
    public AbstractHumanCreateValidation()
    {
        RuleFor(human => human.Image)
        .ImageCreate();

        RuleFor(human => human.Location)
        .LocationCreate();

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

        RuleFor(human => human.Password)
        .Password();
    }
};
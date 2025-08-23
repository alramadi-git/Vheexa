using FluentValidation;

namespace Business.Validations.Human;

public abstract class HumanAddValidation<T> : AbstractValidator<T> where T : DataAccess.Modules.Adds.Abstractions.HumanAdd
{
    public HumanAddValidation()
    {
        /** Image */
        RuleFor(user => user.Image!.URL)
        .NotEmpty()
        .When(user => user.Image != null);

        RuleFor(user => user.Image!.Alternate)
        .NotEmpty()
        .When(user => user.Image != null);

        /** Address */
        RuleFor(user => user.Address.URL)
        .NotEmpty();

        RuleFor(user => user.Address.Country)
        .NotEmpty();

        RuleFor(user => user.Address.City)
        .NotEmpty();

        RuleFor(user => user.Address.Street)
        .NotEmpty();

        /** User */
        RuleFor(user => user.FirstName)
        .MinimumLength(3)
        .MaximumLength(25);

        RuleFor(user => user.MidName)
        .MinimumLength(3)
        .MaximumLength(25);

        RuleFor(user => user.LastName)
        .MinimumLength(3)
        .MaximumLength(25);

        RuleFor(user => user.DateOfBirth)
        .OlderThanX();

        RuleFor(user => user.PhoneNumber)
        .PhoneNumber();

        RuleFor(user => user.Email)
       .EmailAddress();

        RuleFor(user => user.Password)
        .Password();
    }
}
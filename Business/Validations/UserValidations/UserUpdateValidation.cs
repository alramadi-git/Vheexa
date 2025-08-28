using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations.UserValidations;

public class UserUpdateValidation : AbstractValidator<UserUpdateRequestDTO>
{
    public UserUpdateValidation() : base()
    {
        /** Image */
        RuleFor(user => user.Image.URL)
        .NotEmpty().When(user => user.Image != null);

        RuleFor(user => user.Image.Alternate)
        .NotEmpty().When(user => user.Image != null);

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
        .Name();

        RuleFor(user => user.MidName)
        .Name();

        RuleFor(user => user.LastName)
        .Name();

        RuleFor(user => user.DateOfBirth)
        .OlderThanX();

        RuleFor(user => user.PhoneNumber)
        .PhoneNumber();

        RuleFor(user => user.Email)
       .EmailAddress();
    }
}
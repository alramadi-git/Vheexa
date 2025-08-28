using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations.UserValidations;

public class UserSigninValidation : AbstractValidator<CredentialsRequestDTO>
{
    public UserSigninValidation()
    {
        RuleFor(credentials => credentials.Email)
        .EmailAddress();

        RuleFor(credentials => credentials.Password)
        .Password();
    }
}
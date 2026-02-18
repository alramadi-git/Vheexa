using FluentValidation;

using Business.Validations.Extensions;

using Business.Inputs;

namespace Business.Validations.Validators;

public class ClsLoginCredentialsValidator : AbstractValidator<ClsLoginCredentialsInput>
{
    public ClsLoginCredentialsValidator()
    {
        RuleFor(loginCredentials => loginCredentials.Email).EmailAddress();
        RuleFor(loginCredentials => loginCredentials.Password).Password();
    }
}
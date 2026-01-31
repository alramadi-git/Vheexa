using FluentValidation;

using Business.Validations.Extensions;

using Business.Inputs;

namespace Business.Validations.Validators;

public class ClsLoginValidator : AbstractValidator<ClsLoginCredentialsInput>
{
    public ClsLoginValidator()
    {
        RuleFor(loginCredentials => loginCredentials.Email).EmailAddress();
        RuleFor(loginCredentials => loginCredentials.Password).Password();
    }
}
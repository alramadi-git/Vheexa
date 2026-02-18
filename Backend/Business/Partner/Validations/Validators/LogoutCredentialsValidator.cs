using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsLogoutCredentialsValidator : AbstractValidator<ClsLogoutCredentialsInput>
{
    public ClsLogoutCredentialsValidator()
    {
        RuleFor(logoutCredentials => logoutCredentials.RefreshToken)
        .RefreshToken();
    }
}
using FluentValidation;

using Business.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validations.Validators;

public class ClsLogoutCredentialsValidator : AbstractValidator<ClsLogoutCredentialsInput>
{
    public ClsLogoutCredentialsValidator()
    {
        RuleFor(logoutCredentials => logoutCredentials.RefreshToken)
        .RefreshToken();
    }
}
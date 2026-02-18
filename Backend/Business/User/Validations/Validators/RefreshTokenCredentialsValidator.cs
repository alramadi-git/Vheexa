using FluentValidation;

using Business.Validations.Extensions;

using Business.User.Inputs;

namespace Business.User.Validations.Validators;

public class ClsRefreshTokenCredentialsValidator : AbstractValidator<ClsRefreshTokenCredentialsInput>
{
    public ClsRefreshTokenCredentialsValidator()
    {
        RuleFor(refreshTokenCredentials => refreshTokenCredentials.RefreshToken)
        .RefreshToken();
    }
}
using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsRefreshTokenCredentialsValidator : AbstractValidator<ClsRefreshTokenCredentialsInput>
{
    public ClsRefreshTokenCredentialsValidator()
    {
        RuleFor(refreshTokenCredentials => refreshTokenCredentials.RefreshToken)
        .RefreshToken();
    }
}
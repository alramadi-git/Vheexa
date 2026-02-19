using FluentValidation;

using Business.User.Validations.Validators;

using Business.User.Inputs;

namespace Business.User.Validations.Guards;

public class ClsAccountGuard
{
    private readonly ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator;
    private readonly ClsLogoutCredentialsValidator _LogoutCredentialsValidator;

    public ClsAccountGuard(
        ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator,
        ClsLogoutCredentialsValidator _LogoutCredentialsValidator
    )
    {
        this._RefreshTokenCredentialsValidator = _RefreshTokenCredentialsValidator;
        this._LogoutCredentialsValidator = _LogoutCredentialsValidator;
    }

    public async Task RefreshTokenAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        await _RefreshTokenCredentialsValidator.ValidateAndThrowAsync(credentials);
    }
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials)
    {
        await _LogoutCredentialsValidator.ValidateAndThrowAsync(credentials);
    }
}
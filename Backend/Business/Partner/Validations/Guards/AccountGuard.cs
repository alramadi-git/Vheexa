using FluentValidation;

using Business.Partner.Validations.Validators;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsAccountGuard
{
    private readonly ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator = new ClsRefreshTokenCredentialsValidator();
    private readonly ClsLogoutCredentialsValidator _LogoutCredentialsValidator = new ClsLogoutCredentialsValidator();

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
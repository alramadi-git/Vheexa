using FluentValidation;

using Business.Validations.Validators;
using Business.User.Validations.Validators;

using Business.Inputs;
using Business.User.Inputs;

namespace Business.User.Validations.Guards;

public class ClsAuthenticationGuard
{
    private readonly ClsRegisterCredentialsValidator _RegisterCredentialsValidator;
    private readonly ClsLoginCredentialsValidator _LoginCredentialsValidator;
    private readonly ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator;
    private readonly ClsLogoutCredentialsValidator _LogoutCredentialsValidator;

    public ClsAuthenticationGuard(
        ClsRegisterCredentialsValidator _RegisterCredentialsValidator,
        ClsLoginCredentialsValidator _LoginCredentialsValidator,
        ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator,
        ClsLogoutCredentialsValidator _LogoutCredentialsValidator)
    {
        this._RegisterCredentialsValidator = _RegisterCredentialsValidator;
        this._LoginCredentialsValidator = _LoginCredentialsValidator;
        this._RefreshTokenCredentialsValidator = _RefreshTokenCredentialsValidator;
        this._LogoutCredentialsValidator = _LogoutCredentialsValidator;
    }

    public async Task RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        await _RegisterCredentialsValidator.ValidateAndThrowAsync(credentials);
    }
    public async Task LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _LoginCredentialsValidator.ValidateAndThrowAsync(credentials);
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
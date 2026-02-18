using FluentValidation;

using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsAuthenticationGuard
{
    private readonly ClsRegisterCredentialsValidator _RegisterValidator;
    private readonly ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator = new ClsRefreshTokenCredentialsValidator();
    private readonly ClsLoginCredentialsValidator _LoginValidator;
    private readonly ClsLogoutCredentialsValidator _LogoutCredentialsValidator = new ClsLogoutCredentialsValidator();

    public ClsAuthenticationGuard(
        ClsRegisterCredentialsValidator _RegisterValidator,
        ClsLoginCredentialsValidator _LoginValidator,
        ClsRefreshTokenCredentialsValidator _RefreshTokenCredentialsValidator,
        ClsLogoutCredentialsValidator _LogoutCredentialsValidator
    )
    {
        this._RegisterValidator = _RegisterValidator;
        this._LoginValidator = _LoginValidator;
        this._RefreshTokenCredentialsValidator = _RefreshTokenCredentialsValidator;
        this._LogoutCredentialsValidator = _LogoutCredentialsValidator;
    }

    public async Task RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        await _RegisterValidator.ValidateAndThrowAsync(credentials);
    }
    public async Task LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _LoginValidator.ValidateAndThrowAsync(credentials);
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
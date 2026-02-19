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

    public ClsAuthenticationGuard(
        ClsRegisterCredentialsValidator _RegisterCredentialsValidator,
        ClsLoginCredentialsValidator _LoginCredentialsValidator
        )
    {
        this._RegisterCredentialsValidator = _RegisterCredentialsValidator;
        this._LoginCredentialsValidator = _LoginCredentialsValidator;
    }

    public async Task RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        await _RegisterCredentialsValidator.ValidateAndThrowAsync(credentials);
    }
    public async Task LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _LoginCredentialsValidator.ValidateAndThrowAsync(credentials);
    }
}
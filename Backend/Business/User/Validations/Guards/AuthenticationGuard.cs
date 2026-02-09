using Business.Validations.Validators;
using Business.User.Validations.Validators;

using Business.Inputs;
using Business.User.Inputs;

namespace Business.User.Validations.Guards;

public class ClsAuthenticationGuard
{
    private readonly ClsRegisterCredentialsValidator _RegisterValidator;
    private readonly ClsLoginValidator _LoginValidator;

    public ClsAuthenticationGuard(ClsRegisterCredentialsValidator _RegisterValidator, ClsLoginValidator _LoginValidator)
    {
        this._RegisterValidator = _RegisterValidator;
        this._LoginValidator = _LoginValidator;
    }

    public async Task RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        await _RegisterValidator.ValidateAsync(credentials);
    }
    public async Task LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _LoginValidator.ValidateAsync(credentials);
    }
}
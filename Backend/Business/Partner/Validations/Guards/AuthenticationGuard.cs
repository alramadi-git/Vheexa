using Business.Validations.Validators;
using Business.Partner.Validations.Validators;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Validations.Guards;

public class ClsAuthenticationGuard
{
    private readonly ClsRegisterValidator _RegisterValidator;
    private readonly ClsLoginValidator _LoginValidator;

    public ClsAuthenticationGuard(ClsRegisterValidator _RegisterValidator, ClsLoginValidator _LoginValidator)
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
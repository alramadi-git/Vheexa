using Business.Partner.Validations.Guards;

using Business.Partner.Inputs;

namespace Business.Partner.Services;

public class ClsAccountService
{
    private readonly Database.Partner.Repositories.ClsAccountRepository _Repository;
    private readonly ClsAccountGuard _Guard;

    public ClsAccountService(
        Database.Partner.Repositories.ClsAccountRepository repository,
        ClsAccountGuard guard
    )
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task<Database.Models.ClsTokensModel> RefreshTokensAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        await _Guard.RefreshTokenAsync(credentials);

        var tokensModel = await _Repository.RefreshTokensAsync(new Database.Partner.Inputs.ClsRefreshTokenCredentialsInput
        {
            Uuid = credentials.Uuid,
            RefreshToken = credentials.RefreshToken,
        });
        return tokensModel;
    }
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials, Database.Partner.Contexts.ClsMemberContext context)
    {
        await _Guard.LogoutAsync(credentials);

        await _Repository.LogoutAsync(new Database.Partner.Inputs.ClsLogoutCredentialsInput
        {
            RefreshToken = credentials.RefreshToken
        }, context);
    }
}
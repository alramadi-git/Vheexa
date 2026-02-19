using Business.User.Validations.Guards;

using Business.Integrations;

using Business.User.Inputs;

namespace Business.User.Services;

public class ClsAccountService
{
    private readonly Database.User.Repositories.ClsAccountRepository _Repository;
    private readonly ClsAccountGuard _Guard;


    public ClsAccountService(Database.User.Repositories.ClsAccountRepository repository, ClsAccountGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task<Database.Models.ClsTokensModel> RefreshTokensAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        await _Guard.RefreshTokenAsync(credentials);

        var tokensModel = await _Repository.RefreshTokensAsync(new Database.User.Inputs.ClsRefreshTokenCredentialsInput
        {
            Uuid = credentials.Uuid,
            RefreshToken = credentials.RefreshToken
        });
        return tokensModel;
    }
    public async Task LogoutAsync(ClsLogoutCredentialsInput credentials, Database.User.Contexts.ClsUserContext context)
    {
        await _Guard.LogoutAsync(credentials);

        await _Repository.LogoutAsync(new Database.User.Inputs.ClsLogoutCredentialsInput
        {
            RefreshToken = credentials.RefreshToken
        }, context);
    }
}
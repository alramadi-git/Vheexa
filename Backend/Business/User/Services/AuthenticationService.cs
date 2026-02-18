using Business.User.Validations.Guards;

using Business.Integrations;

using Business.Inputs;
using Business.User.Inputs;

namespace Business.User.Services;

public class ClsAuthenticationService
{
    private readonly Database.User.Repositories.ClsAuthenticationRepository _Repository;
    private readonly ClsAuthenticationGuard _Guard;

    private readonly ClsImagekitIntegration _ImagekitIntegration;


    public ClsAuthenticationService(Database.User.Repositories.ClsAuthenticationRepository repository, ClsAuthenticationGuard guard, ClsImagekitIntegration imagekitIntegration)
    {
        _Repository = repository;
        _Guard = guard;

        _ImagekitIntegration = imagekitIntegration;
    }

    public async Task<Database.Models.ClsAccountModel<Database.User.Models.ClsUserAccountModel>> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        string? avatarId = null;

        try
        {
            await _Guard.RegisterAsync(credentials);

            var userUuid = Guid.NewGuid();

            var avatar = credentials.Avatar == null
            ? null
            : await _ImagekitIntegration.UploadOneAsyncSafe(credentials.Avatar, $"/vheexa/users/{userUuid}");

            avatarId = avatar?.Id;

            var userModel = await _Repository.RegisterAsync(new Database.User.Inputs.ClsRegisterCredentialsInput
            {
                Uuid = userUuid,
                Avatar = avatar == null ? null : new Database.Inputs.ClsImageInput
                {
                    Id = avatar.Id,
                    Url = avatar.Url
                },
                Location = new Database.Inputs.ClsLocationInput
                {
                    Country = credentials.Location.Country,
                    City = credentials.Location.City,
                    Street = credentials.Location.Street,
                    Latitude = credentials.Location.Latitude,
                    Longitude = credentials.Location.Longitude
                },
                Username = credentials.Username,
                Birthday = credentials.Birthday,
                PhoneNumber = credentials.PhoneNumber,
                Email = credentials.Email,
                Password = credentials.Password,
                RememberMe = credentials.RememberMe
            });
            return userModel;
        }
        catch
        {
            if (avatarId != null) await _ImagekitIntegration.DeleteImageAsync(avatarId);
            throw;
        }
    }
    public async Task<Database.Models.ClsAccountModel<Database.User.Models.ClsUserAccountModel>> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _Guard.LoginAsync(credentials);

        var userModel = await _Repository.LoginAsync(new Database.Inputs.ClsLoginCredentialsInput
        {
            Email = credentials.Email,
            Password = credentials.Password,
            RememberMe = credentials.RememberMe
        });
        return userModel;
    }
    public async Task<Database.Models.ClsTokensModel> RefreshTokenAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        await _Guard.RefreshTokenAsync(credentials);

        var tokensModel = await _Repository.RefreshTokenAsync(new Database.User.Inputs.ClsRefreshTokenCredentialsInput
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
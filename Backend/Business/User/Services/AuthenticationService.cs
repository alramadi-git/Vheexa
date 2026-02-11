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

    public async Task<Database.User.Models.ClsUserAccountModel> RegisterAsync(ClsRegisterCredentialsInput registerCredentials)
    {
        string? avatarId = null;

        try
        {
            await _Guard.RegisterAsync(registerCredentials);

            var userUuid = Guid.NewGuid();

            var avatar = registerCredentials.Avatar == null
            ? null
            : await _ImagekitIntegration.UploadOneAsyncSafe(registerCredentials.Avatar, $"/users/{userUuid}");

            avatarId = avatar?.Id;

            var account = await _Repository.RegisterAsync(new Database.User.Inputs.ClsRegisterCredentialsInput
            {
                Uuid = userUuid,
                Avatar = avatar == null ? null : new Database.Inputs.ClsImageInput
                {
                    Id = avatar.Id,
                    Url = avatar.Url
                },
                Location = new Database.Inputs.ClsLocationInput
                {
                    Country = registerCredentials.Location.Country,
                    City = registerCredentials.Location.City,
                    Street = registerCredentials.Location.Street,
                    Latitude = registerCredentials.Location.Latitude,
                    Longitude = registerCredentials.Location.Longitude
                },
                Username = registerCredentials.Username,
                Birthday = registerCredentials.Birthday,
                PhoneNumber = registerCredentials.PhoneNumber,
                Email = registerCredentials.Email,
                Password = registerCredentials.Password
            });

            return account;
        }
        catch
        {
            if (avatarId != null) await _ImagekitIntegration.DeleteImageAsync(avatarId);
            throw;
        }
    }
    public async Task<Database.User.Models.ClsUserAccountModel> LoginAsync(ClsLoginCredentialsInput loginCredentials)
    {
        await _Guard.LoginAsync(loginCredentials);

        var account = await _Repository.LoginAsync(new Database.Inputs.ClsLoginCredentialsInput
        {
            Email = loginCredentials.Email,
            Password = loginCredentials.Password
        });

        return account;
    }
}
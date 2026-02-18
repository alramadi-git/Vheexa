using Business.Partner.Validations.Guards;

using Business.Integrations;

using Business.Inputs;
using Business.Partner.Inputs;

namespace Business.Partner.Services;

public class ClsAuthenticationService
{
    private readonly Database.Partner.Repositories.ClsAuthenticationRepository _Repository;
    private readonly ClsAuthenticationGuard _Guard;

    private readonly ClsImagekitIntegration _ImagekitIntegration;


    public ClsAuthenticationService(Database.Partner.Repositories.ClsAuthenticationRepository repository, ClsAuthenticationGuard guard, ClsImagekitIntegration imagekitIntegration)
    {
        _Repository = repository;
        _Guard = guard;

        _ImagekitIntegration = imagekitIntegration;
    }

    public async Task<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        var imageIds = new List<string>(
            (credentials.Logo == null ? 0 : 1) +
            (credentials.Banner == null ? 0 : 1) +
            (credentials.Member.Avatar == null ? 0 : 1)
        );

        try
        {
            await _Guard.RegisterAsync(credentials);

            var partnerUuid = Guid.NewGuid();
            var memberUuid = Guid.NewGuid();

            var uploadTasks = await Task.WhenAll([
                credentials.Logo == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Logo, $"/vheexa/partners/{partnerUuid}"),
                credentials.Banner == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Banner, $"/vheexa/partners/{partnerUuid}"),
                credentials.Member.Avatar == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Member.Avatar, $"/vheexa/partners/{partnerUuid}/members/{memberUuid}"),
            ]);

            var Logo = uploadTasks[0];
            var Banner = uploadTasks[1];
            var Avatar = uploadTasks[2];

            if (Logo != null) imageIds.Add(Logo.Id);
            if (Banner != null) imageIds.Add(Banner.Id);
            if (Avatar != null) imageIds.Add(Avatar.Id);

            var memberModel = await _Repository.RegisterAsync(new Database.Partner.Inputs.ClsRegisterCredentialsInput
            {
                Uuid = partnerUuid,
                Logo = Logo == null ? null : new Database.Inputs.ClsImageInput
                {
                    Id = Logo.Id,
                    Url = Logo.Url
                },
                Banner = Banner == null ? null : new Database.Inputs.ClsImageInput
                {
                    Id = Banner.Id,
                    Url = Banner.Url
                },
                Handle = credentials.Handle,
                OrganizationName = credentials.OrganizationName,
                PhoneNumber = credentials.PhoneNumber,
                Email = credentials.Email,
                RememberMe = credentials.RememberMe,
                Branch = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsBranchInput
                {
                    Location = new Database.Inputs.ClsLocationInput
                    {
                        Country = credentials.Branch.Location.Country,
                        City = credentials.Branch.Location.City,
                        Street = credentials.Branch.Location.Street,
                        Latitude = credentials.Branch.Location.Latitude,
                        Longitude = credentials.Branch.Location.Longitude
                    },
                    Name = credentials.Branch.Name,
                    PhoneNumber = credentials.Branch.PhoneNumber,
                    Email = credentials.Branch.Email
                },
                Member = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsMemberInput
                {
                    Avatar = Avatar == null ? null : new Database.Inputs.ClsImageInput
                    {
                        Id = Avatar.Id,
                        Url = Avatar.Url
                    },
                    Uuid = memberUuid,
                    Username = credentials.Member.Username,
                    Email = credentials.Member.Email,
                    Password = credentials.Member.Password
                }
            });
            return memberModel;
        }
        catch
        {
            if (imageIds.Count > 0) await Task.WhenAll(imageIds.Select(_ImagekitIntegration.DeleteImageAsync));
            throw;
        }
    }
    public async Task<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _Guard.LoginAsync(credentials);

        var memberModel = await _Repository.LoginAsync(new Database.Inputs.ClsLoginCredentialsInput
        {
            Email = credentials.Email,
            Password = credentials.Password,
            RememberMe = credentials.RememberMe
        });
        return memberModel;
    }
    public async Task<Database.Models.ClsTokensModel> RefreshTokenAsync(ClsRefreshTokenCredentialsInput credentials)
    {
        await _Guard.RefreshTokenAsync(credentials);

        var tokensModel = await _Repository.RefreshTokenAsync(new Database.Partner.Inputs.ClsRefreshTokenCredentialsInput
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
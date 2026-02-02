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

    public async Task<Database.Partner.Models.ClsMemberAccountModel> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        var uploadedImageIds = new List<string>(
            (credentials.Logo == null ? 0 : 1) +
            (credentials.Banner == null ? 0 : 1) +
            (credentials.Member.Avatar == null ? 0 : 1)
        );

        try
        {
            await _Guard.RegisterAsync(credentials);

            var partnerUuid = Guid.NewGuid();
            var memberUuid = Guid.NewGuid();

            var uploadedImages = await Task.WhenAll([
                credentials.Logo == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Logo, $"/partners/{partnerUuid}"),
                credentials.Banner == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Banner, $"/partners/{partnerUuid}"),
                credentials.Member.Avatar == null
                ? Task.FromResult<ClsImagekitIntegration.ClsImagekit?>(null)
                : _ImagekitIntegration.UploadOneAsyncSafe(credentials.Member.Avatar, $"/partners/{partnerUuid}/members/{memberUuid}"),
            ]);

            var Logo = uploadedImages[0];
            var Banner = uploadedImages[1];
            var Avatar = uploadedImages[2];

            if (Logo != null) uploadedImageIds.Add(Logo.Id);
            if (Banner != null) uploadedImageIds.Add(Banner.Id);
            if (Avatar != null) uploadedImageIds.Add(Avatar.Id);

            var account = await _Repository.RegisterAsync(new Database.Partner.Inputs.ClsRegisterCredentialsInput
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
                Branch = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsBranchCreateInput
                {
                    Location = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsBranchCreateInput.ClsLocationCreateInput
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
                Member = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsMemberCreateInput
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

            return account;
        }
        catch
        {
            if (uploadedImageIds.Count > 0) await Task.WhenAll(uploadedImageIds.Select(_ImagekitIntegration.DeleteImageAsync));

            throw;
        }
    }
    public async Task<Database.Partner.Models.ClsMemberAccountModel> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _Guard.LoginAsync(credentials);

        var account = await _Repository.LoginAsync(new Database.Inputs.ClsLoginCredentialsInput
        {
            Email = credentials.Email,
            Password = credentials.Password
        });

        return account;
    }
}
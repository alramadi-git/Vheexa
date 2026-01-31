
using Database.Partner.Repositories;

using Business.Partner.Validations.Guards;

using Business.Inputs;
using Business.Partner.Inputs;

using Database.Partner.Dtos;

namespace Business.Partner.Services;

public class ClsAuthenticationService
{
    private readonly ClsAuthenticationRepository _Repository;
    private readonly ClsAuthenticationGuard _Guard;


    public ClsAuthenticationService(ClsAuthenticationRepository repository, ClsAuthenticationGuard guard)
    {
        _Repository = repository;
        _Guard = guard;
    }

    public async Task<ClsAccountDto> RegisterAsync(ClsRegisterCredentialsInput credentials)
    {
        // TODO: make the ImageKit integration and replace the "url" with a real one 
        await _Guard.RegisterAsync(credentials);
        return await _Repository.RegisterAsync(new Database.Partner.Inputs.ClsRegisterCredentialsInput
        {
            Logo = "url",
            Banner = "url",
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
                Email = credentials.Branch.Email,
            },
            Member = new Database.Partner.Inputs.ClsRegisterCredentialsInput.ClsMemberCreateInput
            {
                Avatar = "url",
                Username = credentials.Member.Username,
                Email = credentials.Member.Email,
                Password = credentials.Member.Password,
            }
        });
    }
    public async Task<ClsAccountDto> LoginAsync(ClsLoginCredentialsInput credentials)
    {
        await _Guard.LoginAsync(credentials);
        return await _Repository.LoginAsync(new Database.Inputs.ClsLoginCredentialsInput
        {
            Email = credentials.Email,
            Password = credentials.Password
        });
    }
}
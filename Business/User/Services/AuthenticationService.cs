using DataAccess.User.Repositories;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace Business.User.Services;

public class AuthenticationService
{
    private readonly AuthenticationRepository _AuthenticationRepository;

    public AuthenticationService(AuthenticationRepository authenticationRepository)
    {
        _AuthenticationRepository = authenticationRepository;
    }

    public async Task<SuccessOneDTO<UserDTO>> SigninAsync(CredentialsDTO credentials)
    {
        return await _AuthenticationRepository.SigninAsync(credentials);
    }
}
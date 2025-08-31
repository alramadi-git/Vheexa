using FluentValidation;

using Business.Validations;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.Repositories.UserRepository;

namespace Business.Services.UserServices;

public class UserAuthenticationService
{
    private readonly UserAuthenticationRepository _UserAuthenticationRepository;

    public UserAuthenticationService(UserAuthenticationRepository userRepository)
    {
        _UserAuthenticationRepository = userRepository;
    }

    public async Task SignupAsync(UserSignupRequestDTO userSignup)
    {
        UserSignupValidation.Instance.ValidateAndThrow(userSignup);
        await _UserAuthenticationRepository.SignupAsync(userSignup);
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _UserAuthenticationRepository.SigninAsync(credentials);
    }
}
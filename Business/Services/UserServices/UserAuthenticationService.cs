using FluentValidation;

using Business.Validations.UserValidations;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.Repositories.UserRepository;

namespace Business.Services.UserServices;

public class UserAuthenticationService
{
    private static readonly UserSignupValidation _UserSignupValidator = new();
    private static readonly UserSigninValidation _UserSigninValidator = new();

    private readonly UserAuthenticationRepository _UserAuthenticationRepository;

    public UserAuthenticationService(UserAuthenticationRepository userRepository)
    {
        _UserAuthenticationRepository = userRepository;
    }

    public async Task SignupAsync(UserSignupRequestDTO userSignup)
    {
        _UserSignupValidator.ValidateAndThrow(userSignup);
        await _UserAuthenticationRepository.SignupAsync(userSignup);
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        _UserSigninValidator.ValidateAndThrow(credentials);
        return await _UserAuthenticationRepository.SigninAsync(credentials);
    }
}
using FluentValidation;

using Business.Validations;
using Business.Validations.UserValidations;

using DataAccess.Repositories.UserRepository;
using DataAccess.RequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.UserServices;

public class UserAuthenticationService
{
    private readonly UserAuthenticationRepository _UserAuthenticationRepository;

    public UserAuthenticationService(UserAuthenticationRepository userRepository)
    {
        _UserAuthenticationRepository = userRepository;
    }

    public async Task SignupAsync(UserCreateRequestDTO userSignup)
    {
        UserCreateValidation.Instance.ValidateAndThrow(userSignup);
        await _UserAuthenticationRepository.SignupAsync(userSignup);
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _UserAuthenticationRepository.SigninAsync(credentials);
    }
}
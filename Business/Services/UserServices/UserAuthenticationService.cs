using FluentValidation;

using Business.Validations;
using Business.Validations.UserValidations;
using DataAccess.RequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.User.Repositories;

namespace Business.Services.UserServices;

public class UserAuthenticationService
{
    private readonly AuthenticationRepository _UserAuthenticationRepository;

    public UserAuthenticationService(AuthenticationRepository userRepository)
    {
        _UserAuthenticationRepository = userRepository;
    }

    public async Task SignupAsync(UserCreateRequestDTO userSignup)
    {
        UserCreateValidation.Instance.ValidateAndThrow(userSignup);
        await _UserAuthenticationRepository.SignupAsync(userSignup);
    }

    public async Task<SuccessResponseDTO<UserEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _UserAuthenticationRepository.SigninAsync(credentials);
    }
}
using FluentValidation;

using Business.Validations;
using Business.Validations.UserValidations;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.User.Repositories;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

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

    public async Task<SuccessOneDTO<UserDTO>> SigninAsync(CredentialsDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _UserAuthenticationRepository.SigninAsync(credentials);
    }
}
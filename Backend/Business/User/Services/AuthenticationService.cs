using FluentValidation;
using Database.User.Repositories;
using Database.DTOs;
using Database.User.DTOs;
using Database.Parameters;
using Business.Validations;

namespace Business.User.Services;

public class AuthenticationService
{
    private readonly LoginCredentialsValidation _LoginCredentialsValidation;
    private readonly AuthenticationRepository _AuthenticationRepository;

    public AuthenticationService(LoginCredentialsValidation loginCredentialsValidation, AuthenticationRepository authenticationRepository)
    {
        _LoginCredentialsValidation = loginCredentialsValidation;
        _AuthenticationRepository = authenticationRepository;
    }

    public async Task<SuccessOneDTO<UserDTO>> LoginAsync(LoginCredentialsParameter LoginCredentials)
    {
        await _LoginCredentialsValidation.ValidateAndThrowAsync(LoginCredentials);
        return await _AuthenticationRepository.LoginAsync(LoginCredentials);
    }
}
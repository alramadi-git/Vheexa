using FluentValidation;
using Database.DTOs;
using Database.Parameters;
using Business.Validations;
using Database.DTOs.User;
using Database.Repositories.User;
using Database.DTOs.Abstracts;

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

    public async Task<ClsSuccessDTO<ClsUserDTO>> LoginAsync(LoginCredentialsParameter LoginCredentials)
    {
        await _LoginCredentialsValidation.ValidateAndThrowAsync(LoginCredentials);
        return await _AuthenticationRepository.LoginAsync(LoginCredentials);
    }
}
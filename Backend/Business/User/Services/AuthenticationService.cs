using FluentValidation;
using Database.Dtos;
using Database.Parameters;
using Business.Validations;
using Database.Dtos.User;
using Database.Repositories.User;
using Database.Dtos.Abstracts;

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
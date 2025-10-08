using FluentValidation;

using Business.Validations;

using DataAccess.Repositories.AdminRepository;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace Business.Services.AdminServices;

public class AdminAuthenticationService
{
    private readonly AdminAuthenticationRepository _AdminAuthenticationRepository;

    public AdminAuthenticationService(AdminAuthenticationRepository adminRepository)
    {
        _AdminAuthenticationRepository = adminRepository;
    }

    public async Task<SuccessOneDTO<AdminEntityDTO>> SigninAsync(CredentialsDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _AdminAuthenticationRepository.SigninAsync(credentials);
    }
}
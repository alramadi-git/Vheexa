using FluentValidation;

using Business.Validations;

using DataAccess.Repositories.AdminRepository;
using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.AdminServices;

public class AdminAuthenticationService
{
    private readonly AdminAuthenticationRepository _AdminAuthenticationRepository;

    public AdminAuthenticationService(AdminAuthenticationRepository adminRepository)
    {
        _AdminAuthenticationRepository = adminRepository;
    }

    public async Task<SuccessResponseDTO<AdminEntityDTO>> SigninAsync(CredentialsRequestDTO credentials)
    {
        CredentialsValidation.Instance.ValidateAndThrow(credentials);
        return await _AdminAuthenticationRepository.SigninAsync(credentials);
    }
}
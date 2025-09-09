using FluentValidation;


using DataAccess.Repositories.AdminRepository;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using Business.Validations.AdminValidations;

namespace Business.Services.AdminServices;

public class AdminService
{
    private readonly AdminRepository _AdminRepository;

    public AdminService(AdminRepository adminRepository)
    {
        _AdminRepository = adminRepository;
    }

    public async Task UpdateAsync(int adminID, AdminUpdateRequestDTO adminUpdatedData)
    {
        AdminUpdateValidation.Instance.ValidateAndThrow(adminUpdatedData);
        await _AdminRepository.UpdateAsync(adminID, adminUpdatedData);
    }
}
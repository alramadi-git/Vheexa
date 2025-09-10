using FluentValidation;

using Business.Validations.UserValidations;

using DataAccess.Repositories.AdminRepository;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

namespace Business.Services.AdminServices;

public class AdminUserService
{
    private readonly AdminUserRepository _AdminUserRepository;

    public AdminUserService(AdminUserRepository adminUserRepository)
    {
        _AdminUserRepository = adminUserRepository;
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> GetAsync(int userID)
    {
        var IDValidation = new InlineValidator<int>();

        IDValidation.RuleFor(ID => ID).GreaterThanOrEqualTo(1);
        IDValidation.ValidateAndThrow(userID);

        return await _AdminUserRepository.GetAsync(userID);
    }
    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(UserFiltrationRequestDTO userFilters)
    {
        UserFiltrationValidation.Instance.ValidateAndThrow(userFilters);
        return await _AdminUserRepository.GetManyAsync(userFilters);
    }
}
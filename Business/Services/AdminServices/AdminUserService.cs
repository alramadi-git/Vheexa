using FluentValidation;

using Business.Validations.UserValidations;

using DataAccess.Repositories.AdminRepository;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.User.DTOs.Responses;

namespace Business.Services.AdminServices;

public class AdminUserService
{
    private readonly AdminUserRepository _AdminUserRepository;

    public AdminUserService(AdminUserRepository adminUserRepository)
    {
        _AdminUserRepository = adminUserRepository;
    }

    public async Task<SuccessOneDTO<UserDTO>> GetAsync(int userID)
    {
        var IDValidation = new InlineValidator<int>();

        IDValidation.RuleFor(ID => ID).GreaterThanOrEqualTo(1);
        IDValidation.ValidateAndThrow(userID);

        return await _AdminUserRepository.GetAsync(userID);
    }
    public async Task<SuccessManyDTO<UserDTO>> GetManyAsync(UserFiltrationRequestDTO userFilters)
    {
        UserFiltrationValidation.Instance.ValidateAndThrow(userFilters);
        return await _AdminUserRepository.GetManyAsync(userFilters);
    }
}
using FluentValidation;

using Business.Validations;
using Business.Validations.User;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

using DataAccess.Repositories.AdminRepository;

namespace Business.Services.AdminServices;

public class UserService
{
    private static readonly UserAddValidation _AddValidator = new();
    private static readonly UserFilterValidation _FilterValidator = new();
    private static readonly PaginationValidation _PaginationValidator = new();
    private static readonly UserUpdateValidation _UpdateValidator = new();

    private readonly AdminUserRepository _UserRepository;

    public UserService(AdminUserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> GetAsync(int userID)
    {
        return await _UserRepository.GetAsync(userID);
    }

    public async Task DeleteAsync(int adminID, int userID)
    {
        await _UserRepository.DeleteAsync(adminID, userID);
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(
       GetManyUsersSettingsDTO usersSettings
    )
    {
        _FilterValidator.ValidateAndThrow(usersSettings.Filters);
        _PaginationValidator.ValidateAndThrow(usersSettings.Pagination);

        return await _UserRepository.GetManyAsync(usersSettings);
    }
}
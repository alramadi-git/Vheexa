using FluentValidation;

using Business.Validations.UserValidations;

using DataAccess.RequestDTOs;
using DataAccess.Repositories.UserRepository;

namespace Business.Services.UserServices;

public class UserService
{
    private static readonly UserUpdateValidation _UserUpdateValidator = new();

    private readonly UserRepository _UserRepository;

    public UserService(UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task UpdateAsync(int userID, UserUpdateRequestDTO userUpdatedData)
    {
        _UserUpdateValidator.ValidateAndThrow(userUpdatedData);
        await _UserRepository.UpdateAsync(userID, userUpdatedData);
    }
}
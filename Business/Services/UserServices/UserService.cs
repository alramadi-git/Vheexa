using FluentValidation;

using Business.Validations.UserValidations;

using DataAccess.Repositories.UserRepository;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Services.UserServices;

public class UserService
{
    private readonly UserRepository _UserRepository;

    public UserService(UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task UpdateAsync(int userID, UserUpdateRequestDTO userUpdatedData)
    {
        UserUpdateValidation.Instance.ValidateAndThrow(userUpdatedData);
        await _UserRepository.UpdateAsync(userID, userUpdatedData);
    }
}
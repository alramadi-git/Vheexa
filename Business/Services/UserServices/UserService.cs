using FluentValidation;

using Business.Validations.UserValidations;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.User.Repositories;

namespace Business.Services.UserServices;

public class UserService
{
    private readonly AccountRepository _UserRepository;

    public UserService(AccountRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task UpdateAsync(int userID, UserUpdateRequestDTO userUpdatedData)
    {
        UserUpdateValidation.Instance.ValidateAndThrow(userUpdatedData);
        await _UserRepository.UpdateAsync(userID, userUpdatedData);
    }
}
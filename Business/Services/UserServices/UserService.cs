using FluentValidation;
using DataAccess.Repositories.UserRepository;
using Business.Validations;
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
using FluentValidation;

using Business.Services.Interfaces;
using Business.Validations.User;
using Business.Validations;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;

namespace Business.Services;

public class UserService : IService
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

    public async Task AddOneAsync(UserAddRequestDTO newUser)
    {
        _AddValidator.ValidateAndThrow(newUser);
        await _UserRepository.AddOneAsync(newUser);
    }

    public async Task<SuccessOneResponseDTO<UserEntityDTO>> GetOneAsync(int id)
    {
        return await _UserRepository.GetOneAsync(id);
    }

    public async Task UpdateOneAsync(int id, UserUpdateRequestDTO updatedData)
    {
        _UpdateValidator.ValidateAndThrow(updatedData);
        await _UserRepository.UpdateOneAsync(id, updatedData);
    }

    public async Task DeleteOneAsync(int id)
    {
        await _UserRepository.DeleteOneAsync(id);
    }

    public async Task<SuccessManyResponseDTO<UserEntityDTO>> GetManyAsync(
        UserFiltersRequestDTO filter,
        UserSortingRequestDTO sorting,
        PaginationRequestDTO pagination
    )
    {
        _FilterValidator.ValidateAndThrow(filter);
        _PaginationValidator.ValidateAndThrow(pagination);

        return await _UserRepository.GetManyAsync(filter, sorting, pagination);
    }
}
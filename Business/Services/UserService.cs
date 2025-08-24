using FluentValidation;

using Business.Services.Interfaces;
using Business.Validations.User;

using DataAccess.Modules.Adds;
using DataAccess.Modules.DTOs;
using DataAccess.Repositories;
using DataAccess.Responses;
using Business.Validations;

namespace Business.Services;

public class UserService : IService
{
    private static readonly UserAddValidation _AddValidator = new();
    private static readonly UserFilterValidation _FilterValidator = new();
    private static readonly PaginationValidation _PaginationValidator = new();
    private static readonly UserUpdateValidation _UpdateValidator = new();

    private readonly UserRepository _UserRepository;

    public UserService(UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task AddOneAsync(UserAdd newUser)
    {
        _AddValidator.ValidateAndThrow(newUser);
        await _UserRepository.AddOneAsync(newUser);
    }

    public async Task<SuccessOne<UserDTO>> GetOneAsync(int id)
    {
        return await _UserRepository.GetOneAsync(id);
    }

    public async Task UpdateOneAsync(int id, DataAccess.Modules.Updates.UserUpdate updatedData)
    {
        _UpdateValidator.ValidateAndThrow(updatedData);
        await _UserRepository.UpdateOneAsync(id, updatedData);
    }

    public async Task DeleteOneAsync(int id)
    {
        await _UserRepository.DeleteOneAsync(id);
    }

    public async Task<SuccessMany<UserDTO>> GetManyAsync(
        DataAccess.Modules.Filters.UserFilters filter,
        DataAccess.Modules.Sorting.UserSorting sorting,
        DataAccess.Modules.Filters.PaginationFilters pagination
    )
    {
        _FilterValidator.ValidateAndThrow(filter);
        _PaginationValidator.ValidateAndThrow(pagination);

        return await _UserRepository.GetManyAsync(filter, sorting, pagination);
    }
}
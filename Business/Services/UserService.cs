using FluentValidation;
using Business.Services.Interfaces;

namespace Business.Services;

public class UserService : IService
{
    private static readonly Validations.User.UserAddValidation _AddValidator = new();
    private static readonly Validations.User.UserFilterValidation _FilterValidator = new();
    private static readonly Validations.User.UserUpdateValidation _UpdateValidator = new();

    private readonly DataAccess.Repositories.UserRepository _UserRepository;

    public UserService(DataAccess.Repositories.UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task AddOneAsync(DataAccess.Modules.Adds.UserAdd newUser)
    {
        _AddValidator.ValidateAndThrow(newUser);
        await _UserRepository.AddOneAsync(newUser);
    }

    public async Task<DataAccess.Modules.DTOs.UserDTO> GetOneAsync(int id)
    {
        return await _UserRepository.GetOneAsync(id);
    }
    public async Task<DataAccess.Modules.DTOs.UserDTO> GetOneAsync(string phoneNumber)
    {
        var validator = new InlineValidator<string>();

        validator
        .RuleFor(phoneNumber => phoneNumber)
        .NotEmpty();

        validator.ValidateAndThrow(phoneNumber);
        return await _UserRepository.GetOneAsync(phoneNumber);
    }
    public async Task<DataAccess.Modules.DTOs.UserDTO> GetOneAsync((string email, string password) credentials)
    {
        var validator = new InlineValidator<(string email, string password)>();

        validator
        .RuleFor(credentials => credentials.email)
        .EmailAddress();

        validator
        .RuleFor(credentials => credentials.password)
        .MinimumLength(8)
        .MaximumLength(32);

        validator.ValidateAndThrow((credentials.email, credentials.password));
        return await _UserRepository.GetOneAsync(credentials.email, credentials.password);
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

    public async Task<DataAccess.Responses.SuccessMany<DataAccess.Modules.DTOs.UserDTO>> GetManyAsync(
        DataAccess.Modules.Filters.UserFilter filter,
        DataAccess.Modules.Sorting.UserSorting sorting,
        DataAccess.Modules.Filters.PaginationFilter pagination
    )
    {
        _FilterValidator.ValidateAndThrow(filter);
        return await _UserRepository.GetManyAsync(filter, sorting, pagination);
    }
}
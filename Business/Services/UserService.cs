using FluentValidation;

using Business.Services.Interfaces;

namespace Business.Services;

public class UserService : IService
{
    private static readonly int _MIN_ACCEPTED_AGE = 18;

    private class AddValidator : AbstractValidator<DataAccess.Repositories.UserRepository.Add>
    {
        public AddValidator()
        {
            /** Image */
            RuleFor(user => user.Image!.URL)
            .NotEmpty()
            .When(user => user.Image != null);

            RuleFor(user => user.Image!.Alternate)
            .NotEmpty()
            .When(user => user.Image != null);

            /** Address */
            RuleFor(user => user.Address)
            .NotNull();

            RuleFor(user => user.Address.URL)
            .NotEmpty();

            RuleFor(user => user.Address.Country)
            .NotEmpty();

            RuleFor(user => user.Address.City)
            .NotEmpty();

            RuleFor(user => user.Address.Street)
            .NotEmpty();

            /** User */
            RuleFor(user => user.FirstName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.MidName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.LastName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.DateOfBirth)
            .Must(dateOfBirth =>
            {
                var today = DateTime.Today;
                var age = today.Year - dateOfBirth.Year;

                if (age < _MIN_ACCEPTED_AGE) return false;
                if (age == _MIN_ACCEPTED_AGE && dateOfBirth.Month > today.Month) return false;
                if (age == _MIN_ACCEPTED_AGE && dateOfBirth.Month == today.Month && dateOfBirth.Day > today.Day) return false;

                return true;
            });

            RuleFor(user => user.PhoneNumber)
            .NotNull()
            .MinimumLength(8)
            .MaximumLength(32);

            RuleFor(user => user.Email)
           .NotNull()
           .EmailAddress();

            RuleFor(user => user.Password)
            .NotNull()
            .MinimumLength(8)
            .MaximumLength(32);
        }
    };

    private class FilterValidator : AbstractValidator<DataAccess.Repositories.UserRepository.Filter>
    {
        public FilterValidator()
        {
            /** Address */
            RuleFor(filter => filter.Address.Country)
            .NotEmpty()
            .When(filter => filter.Address?.Country != null);

            RuleFor(filter => filter.Address.City)
            .NotEmpty()
            .When(filter => filter.Address?.City != null);

            RuleFor(filter => filter.Address.Street)
            .NotEmpty()
            .When(filter => filter.Address?.Street != null);

            /** Name */
            RuleFor(filter => filter.FirstName)
            .NotEmpty()
            .When(filter => filter.FirstName != null);

            RuleFor(filter => filter.MidName)
            .NotEmpty()
            .When(filter => filter.MidName != null);

            RuleFor(filter => filter.LastName)
            .NotEmpty()
            .When(filter => filter.LastName != null);

            /** Average Rates */
            RuleFor(filter => filter.MinAverageRates)
            .GreaterThanOrEqualTo(0)
            .When(filter => filter.MinAverageRates != null);

            RuleFor(filter => filter.MaxAverageRates)
            .LessThanOrEqualTo(5)
            .When(filter => filter.MaxAverageRates != null);

            RuleFor(filter => filter)
            .Must(filter => filter.MinAverageRates <= filter.MaxAverageRates)
            .When(filter => filter.MinAverageRates != null && filter.MaxAverageRates != null);

            /** Date Of Birth */
            RuleFor(filter => filter)
            .Must(filter => filter.MinDateOfBirth <= filter.MaxDateOfBirth)
            .When(filter => filter.MinDateOfBirth != null && filter.MaxDateOfBirth != null);

            /** Phone Number */
            RuleFor(filter => filter.PhoneNumber)
            .NotEmpty()
            .When(filter => filter.PhoneNumber != null);

            /** Email */
            RuleFor(filter => filter.Email)
            .NotEmpty()
            .When(filter => filter.Email != null);

            /** Deleted */
            RuleFor(filter => filter)
            .Must(filter => filter.DeletedBefore <= filter.DeletedAfter)
            .When(filter => filter.DeletedBefore != null && filter.DeletedAfter != null && filter.IsDeleted == true);

            /** Updated */
            RuleFor(filter => filter)
            .Must(filter => filter.UpdatedBefore <= filter.UpdatedAfter)
            .When(filter => filter.UpdatedBefore != null && filter.UpdatedAfter != null);

            /** Created */
            RuleFor(filter => filter)
            .Must(filter => filter.CreatedBefore <= filter.CreatedAfter)
            .When(filter => filter.CreatedBefore != null && filter.CreatedAfter != null);
        }
    };

    private class UpdateValidator : AbstractValidator<DataAccess.Repositories.UserRepository.Update>
    {
        public UpdateValidator()
        {
            /** Image */
            RuleFor(user => user.Image!.URL)
            .NotEmpty()
            .When(user => user.Image != null);

            RuleFor(user => user.Image!.Alternate)
            .NotEmpty()
            .When(user => user.Image != null);

            /** Address */
            RuleFor(user => user.Address)
            .NotNull();

            RuleFor(user => user.Address.URL)
            .NotEmpty();

            RuleFor(user => user.Address.Country)
            .NotEmpty();

            RuleFor(user => user.Address.City)
            .NotEmpty();

            RuleFor(user => user.Address.Street)
            .NotEmpty();

            /** User */
            RuleFor(user => user.FirstName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.MidName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.LastName)
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(25);

            RuleFor(user => user.DateOfBirth)
            .Must(dateOfBirth =>
            {
                var today = DateTime.Today;
                var age = today.Year - dateOfBirth.Year;

                if (age < _MIN_ACCEPTED_AGE) return false;
                if (age == _MIN_ACCEPTED_AGE && dateOfBirth.Month > today.Month) return false;
                if (age == _MIN_ACCEPTED_AGE && dateOfBirth.Month == today.Month && dateOfBirth.Day > today.Day) return false;

                return true;
            });

            RuleFor(user => user.PhoneNumber)
            .MinimumLength(8)
            .MaximumLength(32);

            RuleFor(user => user.Email)
           .EmailAddress();
        }
    };

    private static readonly AddValidator _AddValidator = new();
    private static readonly FilterValidator _FilterValidator = new();
    private static readonly UpdateValidator _UpdateValidator = new();

    private readonly DataAccess.Repositories.UserRepository _UserRepository;

    public UserService(DataAccess.Repositories.UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }

    public async Task AddOneAsync(DataAccess.Repositories.UserRepository.Add newUser)
    {
        _AddValidator.ValidateAndThrow(newUser);
        await _UserRepository.AddOneAsync(newUser);
    }

    public async Task<DataAccess.Entities.HumanEntity> GetOneAsync(int id)
    {
        return await _UserRepository.GetOneAsync(id);
    }
    public async Task<DataAccess.Entities.HumanEntity> GetOneAsync(string phoneNumber)
    {
        var validator = new InlineValidator<string>();

        validator
        .RuleFor(phoneNumber => phoneNumber)
        .NotEmpty();

        validator.ValidateAndThrow(phoneNumber);
        return await _UserRepository.GetOneAsync(phoneNumber);
    }
    public async Task<DataAccess.Entities.HumanEntity> GetOneAsync((string email, string password) credentials)
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

    public async Task UpdateOneAsync(int id, DataAccess.Repositories.UserRepository.Update updatedData)
    {
        _UpdateValidator.ValidateAndThrow(updatedData);
        await _UserRepository.UpdateOneAsync(id, updatedData);
    }

    public async Task DeleteOneAsync(int id)
    {
        await _UserRepository.DeleteOneAsync(id);
    }

    public async Task<DataAccess.Responses.SuccessMany<DataAccess.Entities.HumanEntity>> GetManyAsync(DataAccess.Repositories.UserRepository.Filter filter, DataAccess.Repositories.UserRepository.Ordering ordering)
    {
        _FilterValidator.ValidateAndThrow(filter);
        return await _UserRepository.GetManyAsync(filter, ordering);
    }
}
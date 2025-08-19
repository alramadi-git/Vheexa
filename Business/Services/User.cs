using FluentValidation;
using Microsoft.AspNetCore.Identity;

using DataAccess.Repositories;
using Business.Services.Interfaces;

namespace Business.Services;

public class UserService : IService
{
    private static readonly int _MIN_ACCEPTED_AGE = 18;
    public class AddValidator : AbstractValidator<UserRepository.Add>
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

    private readonly UserRepository _UserRepository;

    public UserService(UserRepository userRepository)
    {
        _UserRepository = userRepository;
    }


    public async Task AddOneAsync(UserRepository.Add newUser)
    {
        newUser.Password = new PasswordHasher<object?>().HashPassword(null, newUser.Password);

        await new AddValidator().ValidateAndThrowAsync(newUser);
        await _UserRepository.AddOneAsync(newUser);
    }
    public async Task<DataAccess.Entities.User> GetOneAsync(int id)
    {
        return await _UserRepository.GetOneAsync(id);
    }
    public async Task<DataAccess.Entities.User> GetOneAsync(string phoneNumber)
    {
        return await _UserRepository.GetOneAsync(phoneNumber);
    }
    public async Task<DataAccess.Entities.User> GetOneAsync(string email, string password)
    {
        password = new PasswordHasher<object?>().HashPassword(null, password);
        return await _UserRepository.GetOneAsync(email, password);
    }

}
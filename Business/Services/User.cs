using FluentValidation;

using DataAccess;
using Business.Services.Interfaces;
using System.Text;
using System.Data;
using DataAccess.Repositories;

namespace Business.Services;

public class UserService : IService
{
    public class AddValidator : AbstractValidator<UserRepository.Add>
    {
        public AddValidator()
        {
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


    public async Task AddOneAsync()
    {
    }
}
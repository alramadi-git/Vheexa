using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace Business.Validations.UserValidations;

public class UserCreateValidation : AbstractValidator<UserCreateRequestDTO>
{
    private static readonly Lazy<UserCreateValidation> _Instance = new(() => new());
    public static UserCreateValidation Instance => _Instance.Value;

    private UserCreateValidation()
    {
        RuleFor(user => user)
        .HumanCreate();
    }
};
using FluentValidation;

using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations.UserValidations;

public class UserUpdateValidation : AbstractValidator<UserUpdateRequestDTO>
{
    private static readonly Lazy<UserUpdateValidation> _Instance = new(() => new());
    public static UserUpdateValidation Instance => _Instance.Value;

    private UserUpdateValidation()
    {
        RuleFor(user => user)
        .HumanUpdate();
    }
};
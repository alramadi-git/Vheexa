using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations;

public static class UserValidation
{
    public static IRuleBuilderOptions<T, UserCreateRequestDTO> UserCreate<T>(this IRuleBuilder<T, UserCreateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(user => user
            .RuleFor(user => user)
            .HumanCreate()
        );
    }
    public static IRuleBuilderOptions<T, UserUpdateRequestDTO> UserUpdate<T>(this IRuleBuilder<T, UserUpdateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(user => user
            .RuleFor(user => user)
            .HumanUpdate()
        );
    }
}

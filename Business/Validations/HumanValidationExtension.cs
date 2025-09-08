using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations;

public static class HumanValidationExtensionExtension
{
    public static IRuleBuilderOptions<T, AbstractHumanCreateRequestDTO> HumanCreate<T>(this IRuleBuilder<T, AbstractHumanCreateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(user => user
            .RuleFor(user => user.Image)
            .ImageCreate()
        )
        .ChildRules(user => user
            .RuleFor(user => user.Location)
            .LocationCreate()
        )
        .ChildRules(user => user
            .RuleFor(user => user.FirstName)
            .Username().WithMessage("First name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.MidName)
            .Username().WithMessage("Mid name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.LastName)
            .Username().WithMessage("Last name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.DateOfBirth)
            .DateOfBirth()
        )
        .ChildRules(user => user
            .RuleFor(user => user.PhoneNumber)
            .PhoneNumber()
        )
        .ChildRules(user => user
            .RuleFor(user => user.Email)
            .EmailAddress()
        )
        .ChildRules(user => user
            .RuleFor(user => user.Password)
            .Password()
        );
    }

    public static IRuleBuilderOptions<T, AbstractHumanUpdateRequestDTO> HumanUpdate<T>(this IRuleBuilder<T, AbstractHumanUpdateRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(user => user
            .RuleFor(user => user.Image)
            .ImageUpdate()
        )
        .ChildRules(user => user
            .RuleFor(user => user.Location)
            .LocationUpdate()
        )
        .ChildRules(user => user
            .RuleFor(user => user.FirstName)
            .Username().WithMessage("First name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.MidName)
            .Username().WithMessage("Mid name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.LastName)
            .Username().WithMessage("Last name must be between 3 and 15 characters.")
        )
        .ChildRules(user => user
            .RuleFor(user => user.DateOfBirth)
            .DateOfBirth()
        )
        .ChildRules(user => user
            .RuleFor(user => user.PhoneNumber)
            .PhoneNumber()
        )
        .ChildRules(user => user
            .RuleFor(user => user.Email)
            .EmailAddress()
        );
    }


    public static IRuleBuilderOptions<T, string> Username<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .MinimumLength(3).WithMessage("Name must be at least 3 characters.")
        .MaximumLength(15).WithMessage("Name must be at most 15 characters.");
    }

    public static IRuleBuilderOptions<T, DateOnly> DateOfBirth<T>(this IRuleBuilder<T, DateOnly> ruleBuilder, int olderThanX = 18)
    {
        return ruleBuilder
       .OlderThanX(18).WithMessage("Age must be at least 18 years old.")
       .YoungerThanX(120).WithMessage("Age must be at most 120 years old.");
    }
}
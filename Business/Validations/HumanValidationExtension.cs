using FluentValidation;

namespace Business.Validations;

public static class HumanValidationExtensionExtension
{
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
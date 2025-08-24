using FluentValidation;

namespace Business.Validations;

public static class Validation
{
    public static IRuleBuilderOptions<T, DateOnly> OlderThanX<T>(this IRuleBuilder<T, DateOnly> ruleBuilder, int olderThanX = 18)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        return ruleBuilder
        .LessThanOrEqualTo(today.AddYears(-olderThanX))
        .WithMessage($"Age must be at least {olderThanX} years old.");
    }

    public static IRuleBuilderOptions<T, string> PhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .Matches(@"^\+[1-9]\d{7,14}$")
        .WithMessage("Invalid phone number format.");
    }

    public static IRuleBuilderOptions<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .MinimumLength(8).WithMessage("Password must be at least 8 characters.")
        .MaximumLength(32).WithMessage("Password must be at most 32 characters.")
        .Matches(@"^[^ ]+$").WithMessage("Password must not contain any white spaces.")
        .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
        .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
        .Matches(@"[0-9]").WithMessage("Password must contain at least one number.")
        .Matches(@"[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.");
    }

    public static IRuleBuilderOptions<T, TOptions> EqualToOptions<T, TOptions>(this IRuleBuilder<T, TOptions> ruleBuilder, IEnumerable<TOptions> Options)
    {
        return ruleBuilder
        .Must(value => Options.Contains(value))
        .WithMessage($"Value must be one of the following: {Options}.");
    }
}

using FluentValidation;

namespace Business.Validations;

public static class Validation
{
    public static IRuleBuilderOptions<T, DateOnly> OlderThanX<T>(this IRuleBuilder<T, DateOnly> ruleBuilder, int olderThanX = 18)
    {
        return ruleBuilder.Must(
            dateOfBirth =>
            {
                var today = DateOnly.FromDateTime(DateTime.Today).AddYears(-olderThanX);

                return today >= dateOfBirth;
            }
        ).WithMessage($"Age must be at least {olderThanX} years old.");
    }

    public static IRuleBuilderOptions<T, string> PhoneNumber<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .NotEmpty()
        .Matches(@"^\+[1-9]\d{7,14}$")
        .WithMessage("Invalid phone number format.");
    }

    public static IRuleBuilderOptions<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .NotEmpty()
        .MinimumLength(8).WithMessage("Password must be at least 8 characters.")
        .MaximumLength(32).WithMessage("Password must be at most 32 characters.")
        .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
        .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
        .Matches(@"[0-9]").WithMessage("Password must contain at least one number.")
        .Matches(@"[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.")
        .Matches(@"^[^ ]+$").WithMessage("Password must not contain any white spaces.");
    }
}
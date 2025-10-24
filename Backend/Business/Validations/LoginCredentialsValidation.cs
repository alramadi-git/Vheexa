using FluentValidation;
using Database.Parameters;

namespace Business.Validations;

public class LoginCredentialsValidation : AbstractValidator<LoginCredentialsParameter>
{
    public LoginCredentialsValidation()
    {
        RuleFor(loginCredentials => loginCredentials.Email)
        .EmailAddress();

        RuleFor(loginCredentials => loginCredentials.Password)
        .MinimumLength(8).WithMessage("Password must be at least 8 characters.")
        .MaximumLength(32).WithMessage("Password must be at most 32 characters.")
        .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
        .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
        .Matches(@"[0-9]").WithMessage("Password must contain at least one number.")
        .Matches(@"[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.")
        .Matches(@"^\S+$").WithMessage("Password must not contain any white spaces.");
    }
}
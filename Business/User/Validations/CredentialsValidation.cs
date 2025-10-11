using FluentValidation;
using DataAccess.User.DTOs.Requests;

namespace Business.User.Validations;

public class CredentialsValidation : AbstractValidator<CredentialsDTO>
{
    private static readonly Lazy<CredentialsValidation> _Instance = new(() => new());
    public static CredentialsValidation Instance => _Instance.Value;

    public CredentialsValidation()
    {
        RuleFor(credentials => credentials.Email)
        .EmailAddress();

        RuleFor(credentials => credentials.Password)
        .MinimumLength(8).WithMessage("Password must be at least 8 characters.")
        .MaximumLength(32).WithMessage("Password must be at most 32 characters.")
        .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
        .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
        .Matches(@"[0-9]").WithMessage("Password must contain at least one number.")
        .Matches(@"[^a-zA-Z0-9]").WithMessage("Password must contain at least one special character.")
        .Matches(@"^[^ ]+$").WithMessage("Password must not contain any white spaces.");
    }
}
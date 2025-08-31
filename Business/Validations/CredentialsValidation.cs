using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations;

public class CredentialsValidation : AbstractValidator<CredentialsRequestDTO>
{
    private static Lazy<CredentialsValidation> _Instance = new(() => new());
    public static CredentialsValidation Instance => _Instance.Value;

    private CredentialsValidation()
    {
        RuleFor(credentials => credentials.Email)
        .EmailAddress();

        RuleFor(credentials => credentials.Password)
        .Password();
    }
}
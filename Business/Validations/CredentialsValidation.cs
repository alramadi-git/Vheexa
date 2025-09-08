using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations;

public class CredentialsValidation : AbstractValidator<CredentialsRequestDTO>
{
    private static readonly Lazy<CredentialsValidation> _Instance = new(() => new());
    public static CredentialsValidation Instance => _Instance.Value;

    public CredentialsValidation()
    {
        RuleFor(credentials => credentials.Email)
        .EmailAddress();

        RuleFor(credentials => credentials.Password)
        .Password();
    }
}
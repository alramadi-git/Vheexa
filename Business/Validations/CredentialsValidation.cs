using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations;

public static class CredentialsValidation
{
    public static IRuleBuilderOptions<T, CredentialsRequestDTO> Credentials<T>(this IRuleBuilder<T, CredentialsRequestDTO> ruleBuilder)
    {
        return ruleBuilder
        .ChildRules(credentials => credentials
            .RuleFor(credentials => credentials.Email)
            .EmailAddress()
        )
        .ChildRules(credentials => credentials
            .RuleFor(credentials => credentials.Password)
            .Password()
        );
    }
}

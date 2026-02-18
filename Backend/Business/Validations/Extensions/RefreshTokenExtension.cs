using FluentValidation;

namespace Business.Validations.Extensions;

public static class RefreshTokenExtension
{
    public static IRuleBuilderOptions<T, string> RefreshToken<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .Length(44)
        .Matches("^[a-zA-Z0-9+/=]+$");
    }
}
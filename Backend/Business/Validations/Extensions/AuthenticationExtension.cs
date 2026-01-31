using FluentValidation;

using Microsoft.AspNetCore.Http;

namespace Business.Validations.Extensions;

public static class AuthenticationExtension
{
    public static IRuleBuilderOptions<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder
        .MinimumLength(8)
        .MaximumLength(32)
        .Matches("[a-z]")
        .Matches("[A-Z]")
        .Matches("[0-9]")
        .Matches("[^a-zA-Z0-9]")
        .Matches("^\\S+$");
    }
}
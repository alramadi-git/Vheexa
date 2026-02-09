using FluentValidation;

using Business.Validations.Extensions;

using Business.User.Inputs;

using Business.Validations.Validators;

namespace Business.User.Validations.Validators;

public class ClsRegisterCredentialsValidator : AbstractValidator<ClsRegisterCredentialsInput>
{
    public ClsRegisterCredentialsValidator(ClsLocationValidator locationValidator)
    {
        RuleFor(registerCredentials => registerCredentials.Avatar)
        .MaxKBSize(300)
        .Type("image/")
        .When(registerCredentials => registerCredentials.Avatar != null);

        RuleFor(registerCredentials => registerCredentials.Location).SetValidator(locationValidator);

        RuleFor(registerCredentials => registerCredentials.Username)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(registerCredentials => registerCredentials.PhoneNumber)
        .PhoneNumber();

        RuleFor(registerCredentials => registerCredentials.Birthday)
        .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now).AddYears(-100))
        .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now).AddYears(-18));

        RuleFor(registerCredentials => registerCredentials.Email)
        .EmailAddress();

        RuleFor(registerCredentials => registerCredentials.Password)
        .Password();
    }
}
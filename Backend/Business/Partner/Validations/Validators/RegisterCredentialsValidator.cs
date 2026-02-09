using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

using Business.Validations.Validators;

namespace Business.Partner.Validations.Validators;

public class ClsRegisterCredentialsValidator : AbstractValidator<ClsRegisterCredentialsInput>
{
    public ClsRegisterCredentialsValidator(ClsLocationValidator locationValidator)
    {
        RuleFor(registerCredentials => registerCredentials.Logo!)
        .MaxKBSize(300)
        .Type("image/")
        .When(registerCredentials => registerCredentials.Logo != null);

        RuleFor(registerCredentials => registerCredentials.Banner!)
        .MaxMBSize(1)
        .Type("image/")
        .When(registerCredentials => registerCredentials.Banner != null);

        RuleFor(registerCredentials => registerCredentials.Handle)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(registerCredentials => registerCredentials.OrganizationName)
        .MinimumLength(3)
        .MaximumLength(80);

        RuleFor(registerCredentials => registerCredentials.PhoneNumber).PhoneNumber();

        RuleFor(registerCredentials => registerCredentials.Email).EmailAddress();

        RuleFor(registerCredentials => registerCredentials.Branch.Location).SetValidator(locationValidator);

        RuleFor(registerCredentials => registerCredentials.Branch.Name)
        .MinimumLength(2)
        .MaximumLength(80);

        RuleFor(registerCredentials => registerCredentials.Branch.PhoneNumber)
        .PhoneNumber();

        RuleFor(registerCredentials => registerCredentials.Branch.Email)
        .EmailAddress();

        RuleFor(registerCredentials => registerCredentials.Member.Avatar)
        .MaxKBSize(300)
        .Type("image/")
        .When(registerCredentials => registerCredentials.Member.Avatar != null);

        RuleFor(registerCredentials => registerCredentials.Member.Username)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(registerCredentials => registerCredentials.Member.Email)
        .EmailAddress();

        RuleFor(registerCredentials => registerCredentials.Member.Password)
        .Password();
    }
}
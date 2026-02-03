using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsRegisterValidator : AbstractValidator<ClsRegisterCredentialsInput>
{
    public ClsRegisterValidator()
    {
        RuleFor(memberCreate => memberCreate.Logo!)
        .MaxKBSize(300)
        .Type("image/")
        .When(memberCreate => memberCreate.Logo != null);

        RuleFor(memberCreate => memberCreate.Banner!)
        .MaxMBSize(1)
        .Type("image/")
        .When(memberCreate => memberCreate.Banner != null);

        RuleFor(registerCredentials => registerCredentials.Handle)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(registerCredentials => registerCredentials.OrganizationName)
        .MinimumLength(3)
        .MaximumLength(80);

        RuleFor(registerCredentials => registerCredentials.PhoneNumber).PhoneNumber();

        RuleFor(registerCredentials => registerCredentials.Email).EmailAddress();

        RuleFor(registerCredentials => registerCredentials.Branch.Location.Country)
        .MinimumLength(2)
        .MaximumLength(56);

        RuleFor(registerCredentials => registerCredentials.Branch.Location.City)
        .MinimumLength(2)
        .MaximumLength(85);

        RuleFor(registerCredentials => registerCredentials.Branch.Location.Street)
        .MinimumLength(3)
        .MaximumLength(150);

        RuleFor(registerCredentials => registerCredentials.Branch.Location.Latitude)
        .GreaterThanOrEqualTo(-90)
        .LessThanOrEqualTo(90);

        RuleFor(registerCredentials => registerCredentials.Branch.Location.Longitude)
        .GreaterThanOrEqualTo(-180)
        .LessThanOrEqualTo(180);

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
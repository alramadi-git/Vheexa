using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsMemberCreateValidator : AbstractValidator<ClsMemberCreateInput>
{
    public ClsMemberCreateValidator()
    {
        RuleFor(memberCreate => memberCreate.Avatar)
        .MaxSize(5)
        .Type("image/")
        .When(memberCreate => memberCreate.Avatar != null);

        RuleFor(memberCreate => memberCreate.Username)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(memberCreate => memberCreate.Email)
        .EmailAddress();

        RuleFor(memberCreate => memberCreate.Password)
        .Password();

        RuleFor(memberCreate => memberCreate.Status)
        .IsInEnum();
    }
}

public class ClsMemberFilterValidator : AbstractValidator<ClsMemberFilterInput>
{
    public ClsMemberFilterValidator()
    {
        RuleFor(memberFilter => memberFilter.Search)
        .NotEmpty()
        .MaximumLength(256)
        .When(memberFilter => memberFilter.Search != null);

        RuleFor(memberFilter => memberFilter.Status)
        .IsInEnum()
        .When(memberFilter => memberFilter.Status != null);

    }
}
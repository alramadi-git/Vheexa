using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

using Business.Partner.Filters;

namespace Business.Partner.Validations.Validators;

public class ClsMemberInputValidator : AbstractValidator<ClsMemberInput>
{
    public ClsMemberInputValidator()
    {
        RuleFor(memberInput => memberInput.Avatar!)
        .Type("image/")
        .MaxKBSize(300)
        .When(memberInput => memberInput.Avatar != null);

        RuleFor(memberInput => memberInput.Username)
        .MinimumLength(3)
        .MaximumLength(20);

        RuleFor(memberInput => memberInput.Email)
        .EmailAddress();

        RuleFor(memberInput => memberInput.Password)
        .Password();

        RuleFor(memberInput => memberInput.Status)
        .IsInEnum();
    }
}

public class ClsMemberFilterValidator : AbstractValidator<ClsMemberFilter>
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
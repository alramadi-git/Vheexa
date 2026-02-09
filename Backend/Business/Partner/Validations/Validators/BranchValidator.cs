using FluentValidation;

using Business.Validations.Validators;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

using Business.Partner.Filters;

namespace Business.Partner.Validations.Validators;

public class ClsBranchInputValidator : AbstractValidator<ClsBranchInput>
{
    public ClsBranchInputValidator(ClsLocationValidator locationValidator)
    {
        RuleFor(branchInput => branchInput.Location).SetValidator(locationValidator);

        RuleFor(branchInput => branchInput.Name)
        .MinimumLength(2)
        .MaximumLength(80);

        RuleFor(branchInput => branchInput.PhoneNumber)
        .PhoneNumber();

        RuleFor(branchInput => branchInput.Email)
        .EmailAddress();

        RuleFor(branchInput => branchInput.Status)
        .IsInEnum();
    }
}

public class ClsBranchFilterValidator : AbstractValidator<ClsBranchFilter>
{
    public ClsBranchFilterValidator()
    {
        RuleFor(branchFilter => branchFilter.Search)
        .NotEmpty()
        .MaximumLength(256)
        .When(branchFilter => branchFilter.Search != null);

        RuleFor(branchFilter => branchFilter.Status)
        .IsInEnum()
        .When(branchFilter => branchFilter.Status != null);

    }
}
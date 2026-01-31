using FluentValidation;
using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsBranchCreateValidator : AbstractValidator<ClsBranchCreateInput>
{
    public ClsBranchCreateValidator()
    {
        RuleFor(branchCreate => branchCreate.Location.Country)
        .MinimumLength(2)
        .MaximumLength(56);

        RuleFor(branchCreate => branchCreate.Location.City)
        .MinimumLength(2)
        .MaximumLength(85);

        RuleFor(branchCreate => branchCreate.Location.Street)
        .MinimumLength(3)
        .MaximumLength(150);

        RuleFor(branchCreate => branchCreate.Location.Latitude)
        .GreaterThanOrEqualTo(-90)
        .LessThanOrEqualTo(90);

        RuleFor(branchCreate => branchCreate.Location.Longitude)
        .GreaterThanOrEqualTo(-180)
        .LessThanOrEqualTo(180);

        RuleFor(branchCreate => branchCreate.Name)
        .MinimumLength(2)
        .MaximumLength(80);

        RuleFor(branchCreate => branchCreate.PhoneNumber)
        .PhoneNumber();

        RuleFor(branchCreate => branchCreate.Email)
        .EmailAddress();

        RuleFor(branchCreate => branchCreate.Status)
        .IsInEnum();
    }
}

public class ClsBranchFilterValidator : AbstractValidator<ClsBranchFilterInput>
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
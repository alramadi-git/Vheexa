using FluentValidation;

using Business.Partner.Inputs;

using Business.Partner.Filters;

namespace Business.Partner.Validations.Validators;

public class ClsRoleInputValidator : AbstractValidator<ClsRoleInput>
{
    public ClsRoleInputValidator()
    {
        RuleFor(roleInput => roleInput.Name)
        .MinimumLength(3)
        .MaximumLength(25);

        RuleFor(roleInput => roleInput.Permissions)
        .Must(permissions => permissions.Length > 0).WithMessage("You must assign at least 1 permission.")
        .Must(permissions => permissions.Length <= 19).WithMessage("You can assign a maximum of 19 permissions.");
        RuleForEach(roleInput => roleInput.Permissions)
        .IsInEnum();

        RuleFor(roleInput => roleInput.Status)
        .IsInEnum();
    }
}

public class ClsRoleFilterValidator : AbstractValidator<ClsRoleFilter>
{
    public ClsRoleFilterValidator()
    {
        RuleFor(roleFilter => roleFilter.Name)
        .NotEmpty()
        .MaximumLength(25)
        .When(roleFilter => roleFilter.Name != null);

        RuleFor(roleFilter => roleFilter.Permissions)
        .Must(permissions => permissions.Length <= 19).WithMessage("You can assign a maximum of 19 permissions.");
        RuleForEach(roleFilter => roleFilter.Permissions)
        .IsInEnum();

        RuleFor(roleFilter => roleFilter.Status)
        .IsInEnum()
        .When(roleFilter => roleFilter.Status != null);

    }
}
using FluentValidation;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsRoleCreateValidator : AbstractValidator<ClsRoleCreateInput>
{
    public ClsRoleCreateValidator()
    {
        RuleFor(roleCreate => roleCreate.Name)
        .MinimumLength(3)
        .MaximumLength(25);

        RuleFor(roleCreate => roleCreate.Permissions)
        .Must(permissions => permissions.Length > 0).WithMessage("You must assign at least 1 permission.")
        .Must(permissions => permissions.Length <= 19).WithMessage("You can assign a maximum of 19 permissions.");
        RuleForEach(roleCreate => roleCreate.Permissions)
        .IsInEnum();

        RuleFor(roleCreate => roleCreate.Status)
        .IsInEnum();
    }
}

public class ClsRoleFilterValidator : AbstractValidator<ClsRoleFilterInput>
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
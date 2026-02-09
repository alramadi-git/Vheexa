using FluentValidation;

using Business.Inputs;

namespace Business.Validations.Validators;

public class ClsLocationValidator : AbstractValidator<ClsLocationInput>
{
    public ClsLocationValidator()
    {
        RuleFor(location => location.Country)
        .MinimumLength(2)
        .MaximumLength(56);

        RuleFor(location => location.City)
        .MinimumLength(2)
        .MaximumLength(85);

        RuleFor(location => location.Street)
        .MinimumLength(3)
        .MaximumLength(150);

        RuleFor(location => location.Latitude)
        .GreaterThanOrEqualTo(-90)
        .LessThanOrEqualTo(90);

        RuleFor(location => location.Longitude)
        .GreaterThanOrEqualTo(-180)
        .LessThanOrEqualTo(180);
    }
}
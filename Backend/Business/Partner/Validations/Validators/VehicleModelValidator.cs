using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

using Business.Partner.Filters;

namespace Business.Partner.Validations.Validators;

public class ClsVehicleModelInputValidator : AbstractValidator<ClsVehicleModelInput>
{
    public ClsVehicleModelInputValidator()
    {
        RuleFor(vehicleModelInput => vehicleModelInput.Thumbnail!)
        .MaxMBSize(2)
        .Type("image/")
        .When(vehicleModelInput => vehicleModelInput.Thumbnail != null);

        RuleFor(vehicleModelInput => vehicleModelInput.Gallery)
        .Must(gallery => gallery.Length <= 25).WithMessage("You can assign a maximum of 25 files.");
        RuleForEach(vehicleModelInput => vehicleModelInput.Gallery)
        .MaxMBSize(2)
        .Type("image/");

        RuleFor(vehicleModelInput => vehicleModelInput.Name)
        .MinimumLength(2)
        .MaximumLength(80);

        RuleFor(vehicleModelInput => vehicleModelInput.Description)
        .MaximumLength(750);

        RuleFor(vehicleModelInput => vehicleModelInput.Category)
        .IsInEnum();

        RuleFor(vehicleModelInput => vehicleModelInput.Manufacturer)
        .MinimumLength(2)
        .MaximumLength(60);

        RuleFor(vehicleModelInput => vehicleModelInput.MarketLaunch)
        .GreaterThanOrEqualTo(new DateOnly(1980, 1, 1))
        .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now));

        RuleFor(vehicleModelInput => vehicleModelInput.Capacity)
        .GreaterThanOrEqualTo(1);

        RuleFor(vehicleModelInput => vehicleModelInput.Transmission)
        .MinimumLength(3)
        .MaximumLength(30);

        RuleFor(vehicleModelInput => vehicleModelInput.Fuel)
        .MinimumLength(3)
        .MaximumLength(30);

        RuleFor(vehicleModelInput => vehicleModelInput.Price)
        .GreaterThanOrEqualTo(1);
        RuleFor(vehicleModelInput => vehicleModelInput.Discount)
        .GreaterThanOrEqualTo(0);

        RuleFor(vehicleModelInput => vehicleModelInput)
        .Must(vehicleModelInput => vehicleModelInput.Discount + 1 <= vehicleModelInput.Price).WithMessage("Discount must be less than the price at least 1 dollar.");

        RuleFor(vehicleModelInput => vehicleModelInput.Tags)
        .Must(tags => tags.Length <= 15).WithMessage("You can add a maximum of 15 tags.");
        RuleForEach(vehicleModelInput => vehicleModelInput.Tags)
        .MinimumLength(3)
        .MaximumLength(15);

        RuleFor(vehicleModelInput => vehicleModelInput.Status)
        .IsInEnum();
    }
}

public class ClsVehicleModelFilterValidator : AbstractValidator<ClsVehicleModelFilter>
{
    public ClsVehicleModelFilterValidator()
    {
        RuleFor(vehicleModelFilter => vehicleModelFilter.Search)
        .NotEmpty()
        .MaximumLength(256)
        .When(vehicleModelFilter => vehicleModelFilter.Search != null);

        RuleFor(vehicleModelFilter => vehicleModelFilter.Categories)
        .Must(categories => categories.Length <= 8).WithMessage("You can filter a maximum of 8 tags.");
        RuleForEach(vehicleModelFilter => vehicleModelFilter.Categories)
        .IsInEnum();

        RuleFor(vehicleModelFilter => vehicleModelFilter.Capacity.Min)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Capacity.Min != null);
        RuleFor(vehicleModelFilter => vehicleModelFilter.Capacity.Max)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Capacity.Max != null);

        RuleFor(vehicleModelFilter => vehicleModelFilter.Capacity)
        .Must(capacity => capacity.Min <= capacity.Max).WithMessage("The minimum capacity must be less than or equal to the maximum capacity.")
        .When(vehicleModelFilter =>
            vehicleModelFilter.Capacity.Min != null &&
            vehicleModelFilter.Capacity.Max != null
        );

        RuleFor(vehicleModelFilter => vehicleModelFilter.Price.Min)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Price.Min != null);
        RuleFor(vehicleModelFilter => vehicleModelFilter.Price.Max)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Price.Max != null);

        RuleFor(vehicleModelFilter => vehicleModelFilter.Price)
        .Must(price => price.Min <= price.Max).WithMessage("The minimum price must be less than or equal to the maximum price.")
        .When(vehicleModelFilter =>
            vehicleModelFilter.Price.Min != null &&
            vehicleModelFilter.Price.Max != null
        );

        RuleFor(vehicleModelFilter => vehicleModelFilter.Discount.Min)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Discount.Min != null);
        RuleFor(vehicleModelFilter => vehicleModelFilter.Discount.Max)
        .GreaterThanOrEqualTo(0)
        .When(vehicleModelFilter => vehicleModelFilter.Discount.Max != null);

        RuleFor(vehicleModelFilter => vehicleModelFilter.Discount)
        .Must(discount => discount.Min <= discount.Max).WithMessage("The minimum discount must be less than or equal to the maximum discount.")
        .When(vehicleModelFilter =>
            vehicleModelFilter.Discount.Min != null &&
            vehicleModelFilter.Discount.Max != null
        );

        RuleFor(vehicleModelFilter => vehicleModelFilter)
        .Must(vehicleModelFilter =>
        {
            var maxDiscount = Math.Max(vehicleModelFilter.Discount.Min ?? 0, vehicleModelFilter.Discount.Max ?? 0);
            var maxPrice = Math.Max(vehicleModelFilter.Price.Min ?? 0, vehicleModelFilter.Price.Max ?? 0);

            return maxDiscount + 1 <= maxPrice;
        }).WithMessage("Discount must be less than the price at least 1 dollar.")
        .When(vehicleModelFilter =>
            (vehicleModelFilter.Discount.Min != null || vehicleModelFilter.Discount.Max != null) &&
            (vehicleModelFilter.Price.Min != null || vehicleModelFilter.Price.Max != null)
        );

        RuleFor(vehicleModelFilter => vehicleModelFilter.Status)
        .IsInEnum()
        .When(vehicleModelFilter => vehicleModelFilter.Status != null);
    }
}
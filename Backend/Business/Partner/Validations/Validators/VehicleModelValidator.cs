using FluentValidation;

using Business.Validations.Extensions;

using Business.Partner.Inputs;

namespace Business.Partner.Validations.Validators;

public class ClsVehicleModelCreateValidator : AbstractValidator<ClsVehicleModelCreateInput>
{
    public ClsVehicleModelCreateValidator()
    {
        RuleFor(vehicleModelCreate => vehicleModelCreate.Thumbnail!)
        .MaxMBSize(2)
        .Type("image/")
        .When(vehicleModelCreate => vehicleModelCreate.Thumbnail != null);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Gallery)
        .Must(gallery => gallery.Length <= 25).WithMessage("You can assign a maximum of 25 files.");
        RuleForEach(vehicleModelCreate => vehicleModelCreate.Gallery)
        .MaxMBSize(2)
        .Type("image/");

        RuleFor(vehicleModelCreate => vehicleModelCreate.Name)
        .MinimumLength(2)
        .MaximumLength(80);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Description)
        .MaximumLength(750);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Category)
        .IsInEnum();

        RuleFor(vehicleModelCreate => vehicleModelCreate.Manufacturer)
        .MinimumLength(2)
        .MaximumLength(60);

        RuleFor(vehicleModelCreate => vehicleModelCreate.MarketLaunch)
        .GreaterThanOrEqualTo(new DateOnly(1980, 1, 1))
        .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now));

        RuleFor(vehicleModelCreate => vehicleModelCreate.Capacity)
        .GreaterThanOrEqualTo(1);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Transmission)
        .MinimumLength(3)
        .MaximumLength(30);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Fuel)
        .MinimumLength(3)
        .MaximumLength(30);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Price)
        .GreaterThanOrEqualTo(1);
        RuleFor(vehicleModelCreate => vehicleModelCreate.Discount)
        .GreaterThanOrEqualTo(0);

        RuleFor(vehicleModelCreate => vehicleModelCreate)
        .Must(vehicleModelCreate => vehicleModelCreate.Discount + 1 <= vehicleModelCreate.Price).WithMessage("Discount must be less than the price at least 1 dollar.");

        RuleFor(vehicleModelCreate => vehicleModelCreate.Tags)
        .Must(tags => tags.Length <= 15).WithMessage("You can add a maximum of 15 tags.");
        RuleForEach(vehicleModelCreate => vehicleModelCreate.Tags)
        .MinimumLength(3)
        .MaximumLength(15);

        RuleFor(vehicleModelCreate => vehicleModelCreate.Status)
        .IsInEnum();
    }
}

public class ClsVehicleModelFilterValidator : AbstractValidator<ClsVehicleModelFilterInput>
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
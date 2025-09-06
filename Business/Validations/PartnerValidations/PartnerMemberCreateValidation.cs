using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace Business.Validations.MemberValidations;

public class MemberCreateValidation : AbstractValidator<MemberCreateRequestDTO>
{
    private static Lazy<MemberCreateValidation> _Instance = new(() => new());
    public static MemberCreateValidation Instance => _Instance.Value;

    private MemberCreateValidation()
    {
        /** Image */
        RuleFor(member => member.Image!.URL)
        .NotEmpty()
        .When(member => member.Image != null);

        /** Location */
        RuleFor(member => member.Location.Country)
        .NotEmpty();

        RuleFor(member => member.Location.City)
        .NotEmpty();

        RuleFor(member => member.Location.Latitude)
        .InclusiveBetween(-90, 90)
        .WithMessage("Latitude must be between -90 and 90.");

        RuleFor(member => member.Location.Longitude)
        .InclusiveBetween(-180, 180)
        .WithMessage("Longitude must be between -180 and 180.");

        /** Member */
        RuleFor(member => member.FirstName)
        .Username();

        RuleFor(member => member.MidName)
        .Username();

        RuleFor(member => member.LastName)
        .Username();

        RuleFor(member => member.DateOfBirth)
        .OlderThanX();

        RuleFor(member => member.PhoneNumber)
        .PhoneNumber();

        RuleFor(member => member.Email)
       .EmailAddress();

        RuleFor(member => member.Password)
        .Password();
    }
}
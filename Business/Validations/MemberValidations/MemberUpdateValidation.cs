using FluentValidation;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations;

public class MemberUpdateValidation : AbstractValidator<MemberUpdateRequestDTO>
{
    private static Lazy<MemberUpdateValidation> _Instance = new(() => new());
    public static MemberUpdateValidation Instance => _Instance.Value;

    private MemberUpdateValidation() : base()
    {
        /** Image */
        RuleFor(member => member.Image!.URL)
        .NotEmpty().When(member => member.Image != null);

        /** Address */
        RuleFor(member => member.Location.Country)
        .NotEmpty();

        RuleFor(member => member.Location.City)
        .NotEmpty();

        RuleFor(member => member.Location.Street)
        .NotEmpty();

        RuleFor(user => user.Location.Latitude)
        .InclusiveBetween(-90, 90)
        .WithMessage("Latitude must be between -90 and 90.");

        RuleFor(user => user.Location.Longitude)
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
    }
}
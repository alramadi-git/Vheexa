using FluentValidation;

using DataAccess.RequestDTOs;

namespace Business.Validations;

public class MemberUpdateValidation : AbstractValidator<MemberUpdateRequestDTO>
{
    private static Lazy<MemberUpdateValidation> _Instance = new(() => new());
    public static MemberUpdateValidation Instance => _Instance.Value;

    private MemberUpdateValidation() : base()
    {
        /** Image */
        RuleFor(member => member.Image.URL)
        .NotEmpty().When(member => member.Image != null);

        RuleFor(member => member.Image.Alternate)
        .NotEmpty().When(member => member.Image != null);

        /** Address */
        RuleFor(member => member.Address.URL)
        .NotEmpty();

        RuleFor(member => member.Address.Country)
        .NotEmpty();

        RuleFor(member => member.Address.City)
        .NotEmpty();

        RuleFor(member => member.Address.Street)
        .NotEmpty();

        /** Member */
        RuleFor(member => member.FirstName)
        .Name();

        RuleFor(member => member.MidName)
        .Name();

        RuleFor(member => member.LastName)
        .Name();

        RuleFor(member => member.DateOfBirth)
        .OlderThanX();

        RuleFor(member => member.PhoneNumber)
        .PhoneNumber();

        RuleFor(member => member.Email)
       .EmailAddress();
    }
}
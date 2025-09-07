using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace Business.Validations.PartnerValidations;

public class PartnerCreateValidation : AbstractValidator<PartnerCreateRequestDTO>
{
    private static readonly Lazy<PartnerCreateValidation> _Instance = new(() => new());
    public static PartnerCreateValidation Instance => _Instance.Value;

    private PartnerCreateValidation()
    {
        RuleFor(user => user.Image)
        .ImageCreate();

        RuleFor(user => user.Handle)
        .MinimumLength(3).WithMessage("Handle must be at least 3 characters.")
        .MaximumLength(25).WithMessage("Handle must be at most 25 characters.");

        RuleFor(user => user.Name)
        .MinimumLength(3).WithMessage("Partner name must be at least 3 characters.")
        .MaximumLength(75).WithMessage("Partner name must be at most 75 characters.");

        RuleFor(user => user.PhoneNumber)
        .PhoneNumber();

        RuleFor(user => user.Email)
        .EmailAddress();

        RuleFor(user => user.Password)
        .Password();
    }
};
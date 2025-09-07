using FluentValidation;

using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations.PartnerValidations;

public class PartnerUpdateValidation : AbstractValidator<PartnerUpdateRequestDTO>
{
    private static readonly Lazy<PartnerUpdateValidation> _Instance = new(() => new());
    public static PartnerUpdateValidation Instance => _Instance.Value;

    private PartnerUpdateValidation()
    {
        RuleFor(user => user.Image)
        .ImageUpdate();

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
    }
};
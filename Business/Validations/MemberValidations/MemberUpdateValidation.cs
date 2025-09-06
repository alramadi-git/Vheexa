using FluentValidation;

using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace Business.Validations.MemberValidations;

public class MemberUpdateValidation : AbstractValidator<MemberUpdateRequestDTO>
{
    private static readonly Lazy<MemberUpdateValidation> _Instance = new(() => new());
    public static MemberUpdateValidation Instance => _Instance.Value;

    private MemberUpdateValidation() : base()
    {
        RuleFor(member => member)
        .HumanUpdate();
    }
}
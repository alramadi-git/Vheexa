using FluentValidation;

using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace Business.Validations.MemberValidations;

public class MemberCreateValidation : AbstractValidator<MemberCreateRequestDTO>
{
    private static readonly Lazy<MemberCreateValidation> _Instance = new(() => new());
    public static MemberCreateValidation Instance => _Instance.Value;

    private MemberCreateValidation()
    {
        RuleFor(member => member)
        .HumanCreate();
    }
}
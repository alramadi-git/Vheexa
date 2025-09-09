using DataAccess.RequestDTOs.UpdateRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.MemberValidations;

public class MemberUpdateValidation : AbstractHumanUpdateValidation<MemberUpdateRequestDTO>
{
    private static readonly Lazy<MemberUpdateValidation> _Instance = new(() => new());
    public static MemberUpdateValidation Instance => _Instance.Value;

    private MemberUpdateValidation() : base()
    {
    }
}
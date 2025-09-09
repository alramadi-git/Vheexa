using DataAccess.RequestDTOs.CreateRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.MemberValidations;

public class MemberCreateValidation : AbstractHumanCreateValidation<MemberCreateRequestDTO>
{
    private static readonly Lazy<MemberCreateValidation> _Instance = new(() => new());
    public static MemberCreateValidation Instance => _Instance.Value;

    private MemberCreateValidation()
    {
    }
}
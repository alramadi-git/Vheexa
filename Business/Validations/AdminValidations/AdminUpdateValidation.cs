using DataAccess.RequestDTOs.UpdateRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.AdminValidations;

public class AdminUpdateValidation : AbstractHumanUpdateValidation<AdminUpdateRequestDTO>
{
    private static readonly Lazy<AdminUpdateValidation> _Instance = new(() => new());
    public static AdminUpdateValidation Instance => _Instance.Value;

    private AdminUpdateValidation()
    {
    }
};
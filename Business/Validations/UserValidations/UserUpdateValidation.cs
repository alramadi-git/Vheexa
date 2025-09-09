using DataAccess.RequestDTOs.UpdateRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.UserValidations;

public class UserUpdateValidation : AbstractHumanUpdateValidation<UserUpdateRequestDTO>
{
    private static readonly Lazy<UserUpdateValidation> _Instance = new(() => new());
    public static UserUpdateValidation Instance => _Instance.Value;

    private UserUpdateValidation()
    {
    }
};
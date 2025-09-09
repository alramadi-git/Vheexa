using DataAccess.RequestDTOs.CreateRequestDTOs;
using Business.Validations.HumanValidations;

namespace Business.Validations.UserValidations;

public class UserCreateValidation : AbstractHumanCreateValidation<UserCreateRequestDTO>
{
    private static readonly Lazy<UserCreateValidation> _Instance = new(() => new());
    public static UserCreateValidation Instance => _Instance.Value;

    public UserCreateValidation()
    {
    }
};
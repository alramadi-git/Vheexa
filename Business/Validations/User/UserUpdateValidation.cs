using Business.Validations.Human;
using DataAccess.RequestDTOs;

namespace Business.Validations.User;

public class UserUpdateValidation : HumanUpdateValidation<UserUpdateRequestDTO>
{
    public UserUpdateValidation() : base() { }
}
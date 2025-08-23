using Business.Validations.Human;
using DataAccess.Modules.Updates;

namespace Business.Validations.User;

public class UserUpdateValidation : HumanUpdateValidation<UserUpdate>
{
    public UserUpdateValidation() : base() { }
}
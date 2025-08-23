using Business.Validations.Human;
using DataAccess.Modules.Adds;

namespace Business.Validations.User;

public class UserAddValidation : HumanAddValidation<UserAdd>
{
    public UserAddValidation() : base() { }
}
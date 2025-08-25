using Business.Validations.Human;
using DataAccess.RequestDTOs;

namespace Business.Validations.User;

public class UserAddValidation : HumanAddValidation<UserAddRequestDTO>
{
    public UserAddValidation() : base() { }
}
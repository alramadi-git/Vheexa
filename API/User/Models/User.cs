using DataAccess.User.DTOs.Responses;

namespace API.User.Models;

public class UserModel
{
    public UserDTO User { get; set; }
    public string JWT { get; set; }

    public UserModel(UserDTO user, string jwt)
    {
        User = user;
        JWT = jwt;
    }
}
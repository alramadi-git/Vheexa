using DataAccess.User.DTOs.Responses;

namespace API.User.Models;

public class UserModel
{
    public UserDTO User { get; set; }
    public string Token { get; set; }

    public UserModel(UserDTO user, string token)
    {
        User = user;
        Token = token;
    }
}
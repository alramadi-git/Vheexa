using Database.Entities;

namespace Database.DTOs.User;

public class UserDTO : AbstractHumanDTO
{
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public UserDTO(UserEntity userEntity) : base(userEntity.Human)
    {
        UpdatedAt = userEntity.UpdatedAt;
        CreatedAt = userEntity.CreatedAt;
    }
}
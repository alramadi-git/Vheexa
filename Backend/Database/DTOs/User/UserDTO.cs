using Database.DTOs.Abstracts;
using Database.Entities;

namespace Database.DTOs.User;

public class ClsUserDTO : AbstractClsHumanDTO
{
    public Guid UUID { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public ClsUserDTO(ClsUserEntity user) : base(user.Human)
    {
        UUID = user.Human.UUID;
        UpdatedAt = user.UpdatedAt;
        CreatedAt = user.CreatedAt;
    }
}
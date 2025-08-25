using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class UserEntityDTO : AbstractHumanEntityDTO
{
    public float AverageRates { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public UserEntityDTO(UserEntity user) : base(user.Human!)
    {
        AverageRates = user.AverageRates;

        IsDeleted = user.IsDeleted;
        DeletedAt = user.DeletedAt;

        CreatedAt = user.CreatedAt;
        UpdatedAt = user.UpdatedAt;
    }
}
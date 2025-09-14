using DataAccess.Entities;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class UserEntityDTO : AbstractHumanEntityDTO
{
    public float AverageRates { get; set; }
    
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }

    public UserEntityDTO(UserEntity user) : base(user.Human!)
    {
        IsDeleted = user.IsDeleted;
        DeletedAt = user.DeletedAt;

        UpdatedAt = user.UpdatedAt;
        CreatedAt = user.CreatedAt;
    }
}
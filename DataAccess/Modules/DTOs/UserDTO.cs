using DataAccess.Entities;
using DataAccess.Modules.DTOs.Abstractions;

namespace DataAccess.Modules.DTOs;

public class UserDTO : HumanDTO
{
    public float AverageRates { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public UserDTO(UserEntity user) : base(user.Human!)
    {
        AverageRates = user.AverageRates;

        IsDeleted = user.IsDeleted;
        DeletedAt = user.DeletedAt;

        CreatedAt = user.CreatedAt;
        UpdatedAt = user.UpdatedAt;
    }
}


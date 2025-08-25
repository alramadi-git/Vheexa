using DataAccess.Entities;

namespace DataAccess.EntityDTOs;

public class AdminEntityDTO : AbstractHumanEntityDTO
{
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public AdminEntityDTO(AdminEntity user) : base(user.Human!)
    {
        IsDeleted = user.IsDeleted;
        DeletedAt = user.DeletedAt;

        CreatedAt = user.CreatedAt;
        UpdatedAt = user.UpdatedAt;
    }
}
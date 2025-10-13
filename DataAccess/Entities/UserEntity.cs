using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class UserEntity
{
    [Key]
    public Guid UUID { get; set; }

    public HumanEntity Human { get; set; }
    public Guid HumanID { get; set; }

    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
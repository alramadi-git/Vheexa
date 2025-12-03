namespace Database.Entities;

public class UserEntity
{
    public Guid UUID { get; set; }
    public Guid HumanUUID { get; set; }
    public HumanEntity Human { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}
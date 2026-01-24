namespace Database.Entities;

public class UserEntity
{
    public Guid UUID { get; set; }
    public string? Avatar { get; set; }
    public Guid LocationUUID { get; set; }
    public LocationEntity Location { get; set; }
    public string Username { get; set; }
    public DateOnly Birthday { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}
namespace Database.Entities;

public class ClsUserEntity
{
    public Guid Uuid { get; set; }
    public string? Avatar { get; set; }
    public Guid LocationUuid { get; set; }
    public ClsLocationEntity Location { get; set; }
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
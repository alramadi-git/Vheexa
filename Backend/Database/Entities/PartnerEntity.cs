namespace Database.Entities;

public class ClsPartnerEntity
{
    public Guid Uuid { get; set; }
    public string? Logo { get; set; }
    public string? Banner { get; set; }
    public string Handle { get; set; }
    public string OrganizationName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}
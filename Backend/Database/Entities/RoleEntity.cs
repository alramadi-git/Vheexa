namespace Database.Entities;

public class RoleEntity
{
    public enum AUDIENCE
    {
        ADMIN,
        PARTNER
    }
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public bool IsDefault { get; set; }
    public AUDIENCE Audience { get; set; }
}
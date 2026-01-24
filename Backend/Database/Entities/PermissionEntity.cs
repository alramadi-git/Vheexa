namespace Database.Entities;

public class PermissionEntity
{
    public enum AUDIENCE
    {
        ADMIN,
        PARTNER
    }
    public Guid UUID { get; set; }
    public string Name { get; set; }
    public AUDIENCE Audience { get; set; }
}
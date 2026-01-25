namespace Database.Entities;

public class ClsRoleEntity
{
    public enum AUDIENCE
    {
        ADMIN,
        PARTNER
    }
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public bool IsDefault { get; set; }
    public AUDIENCE Audience { get; set; }
}
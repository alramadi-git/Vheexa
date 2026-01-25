namespace Database.Entities;

public class ClsPermissionEntity
{
    public enum AUDIENCE
    {
        ADMIN,
        PARTNER
    }
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public AUDIENCE Audience { get; set; }
}
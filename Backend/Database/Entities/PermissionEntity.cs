namespace Database.Entities;

public class ClsPermissionEntity
{
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public bool IsAdmin { get; set; }
}
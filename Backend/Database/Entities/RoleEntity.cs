namespace Database.Entities;

public class ClsRoleEntity
{
    public Guid Uuid { get; set; }
    public string Name { get; set; }
    public bool IsDefault { get; set; }
    public bool IsAdmin { get; set; }
}
using Database.Partner.Enums;

namespace Database.Partner.Parameters;

public class ClsRoleCreateParameter
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public string Name { get; set; }
    public PERMISSION[] Permissions { get; set; }
    public STATUS Status { get; set; }
}
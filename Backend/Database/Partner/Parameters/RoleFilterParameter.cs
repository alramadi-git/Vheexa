using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Parameters;

public class ClsRoleFilterParameter
{
    public string? Name { get; set; }
    public PERMISSION[] Permissions { get; set; }
    public STATUS? Status { get; set; }
}
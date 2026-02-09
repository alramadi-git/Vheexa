using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Filters;

public class ClsRoleFilter
{
    public string? Name { get; set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS? Status { get; set; }
}
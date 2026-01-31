using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Inputs;

public class ClsRoleCreateInput
{
    public required string Name { get; set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS Status { get; set; }
}

public class ClsRoleFilterInput
{
    public string? Name { get; set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS? Status { get; set; }
}
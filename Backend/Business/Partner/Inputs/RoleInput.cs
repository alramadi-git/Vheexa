using Database.Enums;
using Database.Partner.Enums;

namespace Business.Partner.Inputs;

public class ClsRoleCreateInput
{
    public required string Name { get => field.Trim(); set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS Status { get; set; }
}

public class ClsRoleFilterInput
{
    public string? Name { get => field?.Trim(); set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS? Status { get; set; }
}
using Database.Enums;
using Database.Partner.Enums;

namespace Database.Partner.Inputs;

public class ClsRoleInput
{
    public required string Name { get; set; }
    public required PERMISSION[] Permissions { get; set; }
    public STATUS Status { get; set; }
}

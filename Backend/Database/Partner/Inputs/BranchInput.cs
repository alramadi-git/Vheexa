using Database.Enums;

using Database.Inputs;

namespace Database.Partner.Inputs;

public class ClsBranchInput
{
    public required ClsLocationInput Location { get; set; }
    public required string Name { get; set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public STATUS Status { get; set; }
}

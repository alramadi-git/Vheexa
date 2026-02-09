using Business.Inputs;

namespace Business.Partner.Inputs;

public class ClsBranchInput
{

    public required ClsLocationInput Location { get; set; }
    public required string Name { get => field.Trim(); set; }
    public required string PhoneNumber { get; set; }
    public required string Email { get; set; }
    public Database.Enums.STATUS Status { get; set; }
}

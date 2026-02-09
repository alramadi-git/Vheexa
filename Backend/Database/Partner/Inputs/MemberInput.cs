using Database.Inputs;

using Database.Enums;

namespace Database.Partner.Inputs;

public class ClsMemberInput
{
    public Guid Uuid { get; set; }
    public ClsImageInput? Avatar { get; set; }
    public Guid RoleUuid { get; set; }
    public Guid BranchUuid { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public STATUS Status { get; set; }
}

using Database.Enums;

namespace Database.Partner.Parameters;

public class ClsMemberCreateParameter
{
    public string Avatar { get; set; }
    public Guid RoleUuid { get; set; }
    public Guid BranchUuid { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public STATUS Status { get; set; }
}
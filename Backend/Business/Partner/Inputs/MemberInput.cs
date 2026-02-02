using Microsoft.AspNetCore.Http;

namespace Business.Partner.Inputs;

public class ClsMemberCreateInput
{
    public IFormFile? Avatar { get; set; }
    public required Guid RoleUuid { get; set; }
    public required Guid BranchUuid { get; set; }
    public required string Username { get => field.Trim(); set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public Database.Enums.STATUS Status { get; set; }
}

public class ClsMemberFilterInput
{
    public string? Search { get => field?.Trim(); set; }
    public required Guid[] RoleUuids { get; set; }
    public required Guid[] BranchUuids { get; set; }
    public Database.Enums.STATUS? Status { get; set; }
}
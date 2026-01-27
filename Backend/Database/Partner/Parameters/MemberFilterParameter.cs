using Database.Enums;

namespace Database.Partner.Parameters;

public class ClsMemberFilterParameter
{
    public string? Search { get; set; }
    public Guid[] Roles { get; set; }
    public Guid[] Branches { get; set; }
    public STATUS? Status { get; set; }
}
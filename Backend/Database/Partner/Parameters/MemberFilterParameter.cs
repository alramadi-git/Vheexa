namespace Database.Partner.Parameters;

public class ClsMemberFilterParameter
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public string? Search { get; set; }
    public Guid[] Roles { get; set; }
    public Guid[] Branches { get; set; }
    public STATUS? Status { get; set; }
}
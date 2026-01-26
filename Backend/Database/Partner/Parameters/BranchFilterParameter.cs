namespace Database.Partner.Parameters;

public class ClsBranchFilterParameter
{
    public enum STATUS
    {
        ACTIVE,
        INACTIVE
    }
    public string? Search { get; set; }
    public STATUS? Status { get; set; }
}
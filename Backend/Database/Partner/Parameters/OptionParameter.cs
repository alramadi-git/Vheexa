namespace Database.Partner.Parameters;

public class ClsOptionPaginationParameter
{
    public int Page { get; set; } = 1;
}

public class ClsOptionFilterParameter
{
    public string? Search { get; set; }
}
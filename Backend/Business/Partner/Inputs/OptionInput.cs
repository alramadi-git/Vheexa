namespace Business.Partner.Inputs;

public class ClsOptionPaginationInput
{
    public int Page { get; set; } = 1;
}

public class ClsOptionFilterInput
{
    public string? Search { get => field?.Trim(); set; }
}
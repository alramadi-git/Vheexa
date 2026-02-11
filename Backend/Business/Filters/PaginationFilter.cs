namespace Business.Filters;

public class ClsPaginationFilter
{
    public enum PAGE_SIZE
    {
        FIVE = 5,
        TEN = 10,
        TWENTY_FIVE = 25,
        FIFTY = 50,
        SEVENTY_FIVE = 75,
        HUNDRED = 100
    }
    public int Page { get; set; } = 1;
    public PAGE_SIZE PageSize { get; set; } = PAGE_SIZE.TEN;
}

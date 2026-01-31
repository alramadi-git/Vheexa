namespace Business.Inputs;

public class ClsPaginationInput
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
    public int Page { get; set; }
    public PAGE_SIZE PageSize { get; set; }
}

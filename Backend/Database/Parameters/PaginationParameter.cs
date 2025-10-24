namespace Database.Parameters;

public enum LIMIT
{
    _5 = 5,
    _10 = 10,
    _25 = 25,
    _50 = 50,
    _75 = 75,
    _100 = 100
}

public class PaginationParameter
{
    public int Page { get; set; } = 1;
    public LIMIT Limit { get; set; } = LIMIT._10;

    public int Skip() { return (Page - 1) * (int)Limit; }
    public int Take() { return (int)Limit; }
}
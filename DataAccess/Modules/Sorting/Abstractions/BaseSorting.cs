namespace DataAccess.Modules.Sorting.Abstractions;

public abstract class BaseSorting<TOption> where TOption : Enum
{
    public TOption? By { get; set; }
    public bool Ascending { get; set; } = true;
}
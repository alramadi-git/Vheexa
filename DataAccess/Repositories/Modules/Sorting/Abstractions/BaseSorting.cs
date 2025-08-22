namespace DataAccess.Repositories.Modules.Sorting.Abstractions;

public abstract class BaseSorting<TOptions>
{
    public TOptions By { get; set; }
    public bool Ascending { get; set; }

    public BaseSorting(TOptions by, bool ascending)
    {
        By = by;
        Ascending = ascending;
    }
}
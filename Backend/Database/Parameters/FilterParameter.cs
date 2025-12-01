namespace Database.Parameters;


public abstract class AbstractFilterParameter<TValue, TEntity>
{
    public TValue Value { get; set; }

    public abstract IQueryable<TEntity> Apply(IQueryable<TEntity> entities);
}

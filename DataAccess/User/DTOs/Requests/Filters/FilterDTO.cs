namespace DataAccess.User.DTOs.Requests.Filters;

public interface IFilterDTO<TEntity>
{
    IQueryable<TEntity> Apply(IQueryable<TEntity> entities);
}

public abstract class AbstractFilterDTO<TValue, TEntity> : IFilterDTO<TEntity>
{
    public required TValue Value { get; set; }

    public abstract IQueryable<TEntity> Apply(IQueryable<TEntity> entities);
}

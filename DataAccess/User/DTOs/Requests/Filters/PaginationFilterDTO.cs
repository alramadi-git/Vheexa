using Microsoft.EntityFrameworkCore;
namespace DataAccess.User.DTOs.Requests.Filters;

public enum PAGE_SIZE
{
    _5 = 5,
    _10 = 10,
    _25 = 25,
    _50 = 50,
    _75 = 75,
    _100 = 100
}

public class PageFilterDTO : AbstractFilterDTO<int, object>
{
    public override IQueryable<object> Apply(IQueryable<object> entities)
    {
        return entities.Skip(Value - 1);
    }
}

public class PageSizeFilterDTO : AbstractFilterDTO<PAGE_SIZE, object>
{
    public override IQueryable<object> Apply(IQueryable<object> entities)
    {
        return entities.Take((int)Value);
    }
}


public class PaginationFilterDTO
{
    public PageFilterDTO Page { get; set; } = new PageFilterDTO { Value = 1 };
    public PageSizeFilterDTO PageSize { get; set; } = new PageSizeFilterDTO { Value = PAGE_SIZE._10 };

    public IQueryable<TEntity> Apply<TEntity>(IQueryable<TEntity> entities)
    {
        var filters = (IQueryable<object>)entities;

        filters = Page.Apply(filters);
        filters = PageSize.Apply(filters);

        return (IQueryable<TEntity>)filters;
    }
}
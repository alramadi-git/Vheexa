using DataAccess.Responses.interfaces;

namespace DataAccess.Responses;

public class SuccessOne<TData> : IResponse
{
    public readonly TData Data;

    public SuccessOne(TData data)
    {
        Data = data;
    }
}

public class SuccessMany<TData> : IResponse
{
    public readonly IList<TData> Data;
    public readonly Pagination Pagination;

    public SuccessMany(IList<TData> data, Pagination pagination)
    {
        Data = data;
        Pagination = pagination;
    }
}
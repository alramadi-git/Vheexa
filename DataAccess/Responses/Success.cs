using DataAccess.Responses.interfaces;

namespace DataAccess.Responses;

public class SuccessOne<TData> : IResponse
{
    public TData Data { get; set; }

    public SuccessOne(TData data)
    {
        Data = data;
    }
}

public class SuccessMany<TData> : IResponse
{
    public class Paginate
    {
        public int TotalFoundRecords { get; set; }
        public int RecordsPerPage { get; set; }
        public int CurrentPage { get; set; }

        public Paginate(int totalFoundRecords, int recordsPerPage, int currentPage)
        {
            TotalFoundRecords = totalFoundRecords;
            RecordsPerPage = recordsPerPage;
            CurrentPage = currentPage;
        }
    }

    public IList<TData> Data { get; set; }
    public Paginate Pagination { get; set; }

    public SuccessMany(IList<TData> data, Paginate pagination)
    {
        Data = data;
        Pagination = pagination;
    }
}
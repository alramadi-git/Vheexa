namespace DataAccess.Responses;

public class Pagination
{
    public readonly int TotalFoundRecords;
    public readonly int RecordsPerPage;
    public readonly int CurrentPage;

    public Pagination(int totalFoundRecords, int recordsPerPage, int currentPage)
    {
        TotalFoundRecords = totalFoundRecords;
        RecordsPerPage = recordsPerPage;
        CurrentPage = currentPage;
    }
}
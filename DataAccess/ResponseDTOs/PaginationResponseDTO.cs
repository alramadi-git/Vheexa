using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace DataAccess.ResponseDTOs;

public class PaginationResponseDTO
{
    public int TotalFoundRecords { get; set; }
    public RECORDS_PER_REQUEST_OPTION_REQUEST_DTO RecordsPerPage { get; set; }
    public int CurrentPage { get; set; }


    public PaginationResponseDTO(int totalFoundRecords, RECORDS_PER_REQUEST_OPTION_REQUEST_DTO recordsPerPage, int currentPage)
    {

        TotalFoundRecords = totalFoundRecords;
        RecordsPerPage = recordsPerPage;
        CurrentPage = currentPage;
    }
}
namespace DataAccess.RequestDTOs;

public enum RECORDS_PER_REQUEST_OPTION_REQUEST_DTO : int
{
    _10 = 10,
    _25 = 25,
    _50 = 50,
    _75 = 75,
    _100 = 100,
}

public class PaginationRequestDTO
{
    public int RequestedPage { get; set; } = 1;
    public RECORDS_PER_REQUEST_OPTION_REQUEST_DTO RecordsPerRequest { get; set; } = RECORDS_PER_REQUEST_OPTION_REQUEST_DTO._10;
}
namespace DataAccess.RequestDTOs.FiltrationRequestDTOs;

public enum RECORDS_PER_REQUEST_OPTION_REQUEST_DTO : int
{
    _10 = 10,
    _25 = 25,
    _50 = 50,
    _75 = 75,
    _100 = 100,
}

public class PaginationFiltrationRequestDTO
{
    public required int RequestedPage { get; set; }
    public required RECORDS_PER_REQUEST_OPTION_REQUEST_DTO RecordsPerRequest { get; set; }
}
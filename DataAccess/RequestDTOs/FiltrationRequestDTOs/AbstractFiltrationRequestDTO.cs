namespace DataAccess.RequestDTOs.FiltrationRequestDTOs;

public abstract class AbstractFiltrationRequestDTO<TSortingOption> where TSortingOption : Enum
{
    public required AbstractSortingFiltrationRequestDTO<TSortingOption> Sorting { get; set; }
    public required PaginationFiltrationRequestDTO Pagination { get; set; }
}
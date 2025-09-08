using DataAccess.RequestDTOs.FiltersRequestDTOs;

namespace DataAccess.RequestDTOs;

public abstract class AbstractHumanFiltrationRequestDTO<TSortingOption> : AbstractFiltersRequestDTO<TSortingOption> where TSortingOption : Enum
{
    public string? FirstName { get; set; }
    public string? MidName { get; set; }
    public string? LastName { get; set; }

    public LocationsFiltersRequestDTO? Location { get; set; }


    public DateOnly? MinDateOfBirth { get; set; }
    public DateOnly? MaxDateOfBirth { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}

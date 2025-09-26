namespace DataAccess.RequestDTOs.CreateRequestDTOs;

public class BookingCreateRequestDTO
{
    public int VehicleInstanceID { get; set; }
    
    public int PickupLocationID { get; set; }
    public int DropoffLocationID { get; set; }

    public DateTime PickupTimestamp { get; set; }
    public DateTime DropoffTimestamp { get; set; }
}
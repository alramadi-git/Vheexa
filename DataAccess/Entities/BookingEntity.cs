namespace DataAccess.Entities;

public enum BOOKING_STATUS_OPTION_ENTITY
{
    PENDING,
    CANCELLED,
    ACCEPTED,
    REJECTED
}

public class BookingEntity
{
    public int ID { get; set; }

    public UserEntity? User { get; set; }
    public int UserID { get; set; }

    public VehicleInstanceEntity? VehicleInstance { get; set; }
    public int VehicleInstanceID { get; set; }

    public CheckoutEntity? Checkout { get; set; }
    public int CheckoutID { get; set; }

    public PartnerSupportedLocationEntity? PickupLocation { get; set; }
    public int PickupLocationID { get; set; }

    public PartnerSupportedLocationEntity? DropoffLocation { get; set; }
    public int DropoffLocationID { get; set; }

    public DateTime PickupTimestamp { get; set; }
    public DateTime DropoffTimestamp { get; set; }

    public BOOKING_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime CreatedAt { get; set; }
}
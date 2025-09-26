namespace DataAccess.Entities;

public enum RENT_STATUS_OPTION_ENTITY
{
    IN_USE,
    RETURNED,
    STOLEN
}

public class RentEntity
{
    public int ID { get; set; }

    public BookingEntity? Booking { get; set; }
    public int BookingID { get; set; }

    public DateTime PickupTimestamp { get; set; }

    public RENT_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime CreatedAt { get; set; }
}
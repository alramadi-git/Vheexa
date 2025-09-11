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

    public RequestToRentEntity? RequestToRent { get; set; }
    public int RequestToRentID { get; set; }

    public DateTime PickupTimestamp { get; set; }

    public RENT_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime CreatedAt { get; set; }
}
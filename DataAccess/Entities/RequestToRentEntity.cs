namespace DataAccess.Entities;

public enum REQUEST_TO_RENT_STATUS_OPTION_ENTITY
{
    PENDING,
    CANCELLED,
    ACCEPTED,
    REJECTED
}

public class RequestToRentEntity
{
    public int ID { get; set; }

    public BookingEntity? Booking { get; set; }
    public int BookingID { get; set; }

    public MemberEntity? Member { get; set; }
    public int MemberID { get; set; }

    public required string Notes { get; set; }

    public REQUEST_TO_RENT_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime UpdatedAt { get; set; }
    public DateTime CreatedAt { get; set; }
}
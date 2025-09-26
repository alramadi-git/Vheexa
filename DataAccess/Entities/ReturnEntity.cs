namespace DataAccess.Entities;

public enum RETURN_STATUS_OPTION_ENTITY
{
    EARLY_RETURN,
    ON_TIME,
    EXCEEDED
}

public class ReturnEntity
{
    public int ID { get; set; }

    public RentEntity? Rent { get; set; }
    public int RentID { get; set; }

    public DateTime DropoffTimestamp { get; set; }

    public RETURN_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime CreatedAt { get; set; }
}
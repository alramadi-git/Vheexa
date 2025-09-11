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

    public RequestToReturnEntity? RequestToReturn { get; set; }
    public int RequestToReturnID { get; set; }

    public DateTime DropoffTimestamp { get; set; }

    public RETURN_STATUS_OPTION_ENTITY Status { get; set; }

    public DateTime CreatedAt { get; set; }
}
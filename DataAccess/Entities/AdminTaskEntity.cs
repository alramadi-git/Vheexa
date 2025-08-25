namespace DataAccess.Entities;

public class AdminTaskEntity
{
    public int ID { get; set; }

    public AdminEntity? Admin { get; set; }
    public int AdminID { get; set; }

    public TaskEntity? Task { get; set; }
    public int TaskID { get; set; }

    public DateTime CreatedAt { get; set; }
}
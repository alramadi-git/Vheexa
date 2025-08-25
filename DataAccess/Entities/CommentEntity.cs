namespace DataAccess.Entities;

public class CommentEntity
{
    public int ID { get; set; }

    public required string Label { get; set; }
    public required string Description { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Entities;

public class ImageEntity
{
    [Key]
    public Guid UUID { get; set; }
    public string URL { get; set; }
}
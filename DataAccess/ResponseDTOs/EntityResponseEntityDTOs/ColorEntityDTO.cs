using DataAccess.Entities;
using DataAccess.RequestDTOs.CreateRequestDTOs;

namespace DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

public class ColorEntityDTO
{
    public int ID { get; set; }

    public string Name { get; set; }
    public string HexCode { get; set; }

    public ColorEntityDTO(ColorEntity color)
    {
        ID = color.ID;

        Name = color.Name;
        HexCode = color.HexCode;
    }
}

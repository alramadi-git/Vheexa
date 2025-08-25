using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.PartnersControllers.VehiclesControllers;

[ApiController]
[Route("api/partners/vehicles")]
public class PartnerVehicleController : Controller
{
    private readonly ILogger<PartnerVehicleController> _Logger;

    public PartnerVehicleController(ILogger<PartnerVehicleController> logger)
    {
        _Logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult> AddOneAsync([FromBody] object newVehicle)
    {
        try
        {
            return Created();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetOneAsync(int id)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateOneAsync(int id, [FromBody] object updatedData)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOneAsync(int id)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<ActionResult> GetManyAsync([FromQuery] object filters, [FromQuery] object sorting, [FromQuery] object pagination)
    {
        try
        {
            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
using Microsoft.AspNetCore.Mvc;

using Business.Filters;
using Business.Partner.Filters;
namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/vehicle-models")]
public class ClsVehicleModelController : Controller
{
    private readonly Business.Partner.Services.ClsVehicleModelService _VehicleModelService;

    public ClsVehicleModelController(Business.Partner.Services.ClsVehicleModelService vehicleModelService)
    {
        _VehicleModelService = vehicleModelService;
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsVehicleModelInput vehicleModel)
    {
        await _VehicleModelService.CreateOneAsync(vehicleModel, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _VehicleModelService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return NoContent();
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsVehicleModelModel>>> SearchAsync([FromQuery] ClsVehicleModelFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var vehicleModels = await _VehicleModelService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(vehicleModels);
    }
}
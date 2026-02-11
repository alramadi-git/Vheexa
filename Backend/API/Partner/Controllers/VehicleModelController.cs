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
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _VehicleModelService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return NoContent();
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsVehicleModelModel>>> SearchAsync([FromQuery] ClsVehicleModelFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var vehicleModels = await _VehicleModelService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Ok(vehicleModels);
    }
}
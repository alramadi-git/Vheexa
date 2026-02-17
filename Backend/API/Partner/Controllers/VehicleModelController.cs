using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/vehicle-models")]
[Authorize(AuthenticationSchemes = "Partners")]
public class ClsVehicleModelController : Controller
{
    private readonly Business.Partner.Services.ClsVehicleModelService _VehicleModelService;

    public ClsVehicleModelController(Business.Partner.Services.ClsVehicleModelService vehicleModelService)
    {
        _VehicleModelService = vehicleModelService;
    }

    [HttpPost("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.VEHICLE_MODELS_CREATE))]

    public async Task<ActionResult> CreateOneAsync([FromForm] Business.Partner.Inputs.ClsVehicleModelInput vehicleModel)
    {
        await _VehicleModelService.CreateOneAsync(vehicleModel, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.VEHICLE_MODELS_DELETE))]

    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _VehicleModelService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }

    [HttpGet("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.VEHICLE_MODELS_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsVehicleModelModel>>> SearchAsync([FromQuery] ClsVehicleModelFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var vehicleModels = await _VehicleModelService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(vehicleModels);
    }
}
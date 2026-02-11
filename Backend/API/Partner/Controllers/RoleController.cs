using Microsoft.AspNetCore.Mvc;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/roles")]
public class ClsRoleController : Controller
{
    private readonly Business.Partner.Services.ClsRoleService _RoleService;

    public ClsRoleController(Business.Partner.Services.ClsRoleService roleService)
    {
        _RoleService = roleService;
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsRoleInput role)
    {
        await _RoleService.CreateOneAsync(role, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _RoleService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return NoContent();
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsRoleModel>>> SearchAsync([FromQuery] ClsRoleFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var roles = await _RoleService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Ok(roles);
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/roles")]
[Authorize(AuthenticationSchemes = "Partners")]
public class ClsRoleController : Controller
{
    private readonly Business.Partner.Services.ClsRoleService _RoleService;

    public ClsRoleController(Business.Partner.Services.ClsRoleService roleService)
    {
        _RoleService = roleService;
    }

    [HttpPost("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.ROLES_CREATE))]

    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsRoleInput role)
    {
        await _RoleService.CreateOneAsync(role, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.ROLES_DELETE))]

    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _RoleService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }

    [HttpGet("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.ROLES_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsRoleModel>>> SearchAsync([FromQuery] ClsRoleFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var roles = await _RoleService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(roles);
    }
}
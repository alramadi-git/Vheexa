using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/branches")]
[Authorize(AuthenticationSchemes = "Partners")]
public class ClsBranchController : Controller
{
    private readonly Business.Partner.Services.ClsBranchService _BranchService;

    public ClsBranchController(Business.Partner.Services.ClsBranchService branchService)
    {
        _BranchService = branchService;
    }

    [HttpPost("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.BRANCHES_CREATE))]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsBranchInput branch)
    {

        await _BranchService.CreateOneAsync(branch, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.BRANCHES_DELETE))]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _BranchService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }

    [HttpGet("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.BRANCHES_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsBranchModel>>> SearchAsync([FromQuery] ClsBranchFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var branches = await _BranchService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(branches);
    }
}
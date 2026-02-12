using Microsoft.AspNetCore.Mvc;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/branches")]
public class ClsBranchController : Controller
{
    private readonly Business.Partner.Services.ClsBranchService _BranchService;

    public ClsBranchController(Business.Partner.Services.ClsBranchService branchService)
    {
        _BranchService = branchService;
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsBranchInput branch)
    {
        await _BranchService.CreateOneAsync(branch, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _BranchService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return NoContent();
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsBranchModel>>> SearchAsync([FromQuery] ClsBranchFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var branches = await _BranchService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Ok(branches);
    }
}
using Microsoft.AspNetCore.Mvc;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/branches")]
public class ClsBranchController : Controller
{
    private readonly Business.Partner.Services.ClsBranchService _BranchService;

    public ClsBranchController(Business.Partner.Services.ClsBranchService branchService)
    {
        _BranchService = branchService;
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsBranchCreateInput branch)
    {
        await _BranchService.CreateOneAsync(branch, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _BranchService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return NoContent();
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsBranchModel>>> SearchAsync([FromQuery] Business.Partner.Inputs.ClsBranchFilterInput filter, [FromQuery] Business.Inputs.ClsPaginationInput pagination)
    {
        var branches = await _BranchService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(branches);
    }
}
using Microsoft.AspNetCore.Mvc;

using Business.Filters;
using Business.Partner.Filters;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/members")]
public class ClsMemberController : Controller
{
    private readonly Business.Partner.Services.ClsMemberService _MemberService;

    public ClsMemberController(Business.Partner.Services.ClsMemberService memberService)
    {
        _MemberService = memberService;
    }

    [HttpGet("options/roles")]
    public async Task<ActionResult> ReadRolesAsync([FromQuery] Guid[] uuids)
    {
        var roleOptions = await _MemberService.ReadRolesAsync(uuids, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(roleOptions);
    }
    [HttpGet("options/branches")]
    public async Task<ActionResult> ReadBranchesAsync([FromQuery] Guid[] uuids)
    {
        var branchOptions = await _MemberService.ReadBranchesAsync(uuids, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(branchOptions);
    }

    [HttpPost("")]
    public async Task<ActionResult> CreateOneAsync([FromBody] Business.Partner.Inputs.ClsMemberInput member)
    {
        await _MemberService.CreateOneAsync(member, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Created();
    }

    [HttpDelete("{uuid}")]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _MemberService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return NoContent();
    }

    [HttpGet("options/roles/search")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>>> SearchRolesAsync([FromQuery] ClsOptionFilterFilter filter, [FromQuery] ClsOptionPaginationFilter pagination)
    {
        var roleOptions = await _MemberService.SearchRolesAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(roleOptions);
    }
    [HttpGet("options/branches/search")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>>> SearchBranchesAsync([FromQuery] ClsOptionFilterFilter filter, [FromQuery] ClsOptionPaginationFilter pagination)
    {
        var branchOptions = await _MemberService.SearchBranchesAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(branchOptions);
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsMemberModel>>> SearchAsync([FromQuery] ClsMemberFilter filter, [FromQuery] ClsPaginationFilter pagination)
    {
        var members = await _MemberService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("c79cf3f7-d4d5-464e-a283-58c67b6be878"),
        });

        return Ok(members);
    }
}
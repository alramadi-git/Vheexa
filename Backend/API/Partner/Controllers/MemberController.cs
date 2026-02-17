using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/members")]
[Authorize(AuthenticationSchemes = "Partners")]
public class ClsMemberController : Controller
{
    private readonly Business.Partner.Services.ClsMemberService _MemberService;

    public ClsMemberController(Business.Partner.Services.ClsMemberService memberService)
    {
        _MemberService = memberService;
    }

    [HttpPost("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_CREATE))]
    public async Task<ActionResult> CreateOneAsync([FromForm] Business.Partner.Inputs.ClsMemberInput member)
    {
        await _MemberService.CreateOneAsync(member, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Created();
    }

    [HttpGet("options/roles")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_READ))]
    public async Task<ActionResult> ReadRolesAsync([FromQuery] Guid[] uuids)
    {
        var roleOptions = await _MemberService.ReadRolesAsync(uuids, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(roleOptions);
    }
    [HttpGet("options/branches")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_READ))]
    public async Task<ActionResult> ReadBranchesAsync([FromQuery] Guid[] uuids)
    {
        var branchOptions = await _MemberService.ReadBranchesAsync(uuids, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(branchOptions);
    }

    [HttpDelete("{uuid}")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_DELETE))]
    public async Task<ActionResult> DeleteOneAsync([FromRoute] Guid uuid)
    {
        await _MemberService.DeleteOneAsync(uuid, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }

    [HttpGet("options/roles/search")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>>> SearchRolesAsync([FromQuery] Business.Partner.Filters.ClsOptionFilterFilter filter, [FromQuery] Business.Partner.Filters.ClsOptionPaginationFilter pagination)
    {
        var roleOptions = await _MemberService.SearchRolesAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(roleOptions);
    }
    [HttpGet("options/branches/search")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsOptionModel>>> SearchBranchesAsync([FromQuery] Business.Partner.Filters.ClsOptionFilterFilter filter, [FromQuery] Business.Partner.Filters.ClsOptionPaginationFilter pagination)
    {
        var branchOptions = await _MemberService.SearchBranchesAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(branchOptions);
    }

    [HttpGet("")]
    [Authorize(Policy = nameof(Database.Partner.Enums.PERMISSION.MEMBERS_READ))]
    public async Task<ActionResult<Database.Models.ClsPaginatedModel<Database.Partner.Models.ClsMemberModel>>> SearchAsync([FromQuery] Business.Partner.Filters.ClsMemberFilter filter, [FromQuery] Business.Filters.ClsPaginationFilter pagination)
    {
        var members = await _MemberService.SearchAsync(filter, pagination, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(members);
    }
}
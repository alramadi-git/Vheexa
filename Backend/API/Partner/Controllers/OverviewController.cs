using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/overview")]
[Authorize(AuthenticationSchemes = "Partners")]
public class ClsOverviewController : Controller
{
    private readonly Business.Partner.Services.ClsOverviewService _OverviewService;

    public ClsOverviewController(Business.Partner.Services.ClsOverviewService overviewService)
    {
        _OverviewService = overviewService;
    }

    [HttpGet("")]
    public async Task<ActionResult<Database.Partner.Models.ClsOverviewModel>> ReadAsync()
    {
        var overview = await _OverviewService.ReadAsync(new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return Ok(overview);
    }
}
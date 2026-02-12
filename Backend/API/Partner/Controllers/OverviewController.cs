using Microsoft.AspNetCore.Mvc;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/dashboard/overview")]
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
            Uuid = new Guid("bda46d8a-12ee-450e-972c-3969b36fd48e"),
            PartnerUuid = new Guid("550c8d76-1cb0-4647-b66e-99ca0586f771"),
        });

        return Ok(overview);
    }
}
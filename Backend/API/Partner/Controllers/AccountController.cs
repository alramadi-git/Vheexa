using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/account")]
public class ClsAccountController : Controller
{
    private readonly Business.Partner.Services.ClsAccountService _AccountService;


    public ClsAccountController(Business.Partner.Services.ClsAccountService accountService)
    {
        _AccountService = accountService;
    }

    [HttpPost("refresh-tokens")]
    public async Task<ActionResult<Database.Models.ClsTokensModel>> RefreshTokensAsync([FromBody] Business.Partner.Inputs.ClsRefreshTokenCredentialsInput credentials)
    {
        var tokensModel = await _AccountService.RefreshTokensAsync(credentials);

        return Ok(tokensModel);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Partners")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.Partner.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AccountService.LogoutAsync(credentials, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }
}
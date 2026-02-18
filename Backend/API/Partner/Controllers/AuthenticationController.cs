using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Partner.Controllers;

[ApiController]
[Route("api/partner/authentication")]
public class ClsAuthenticationController : Controller
{
    private readonly Business.Partner.Services.ClsAuthenticationService _AuthenticationService;


    public ClsAuthenticationController(Business.Partner.Services.ClsAuthenticationService authenticationService)
    {
        _AuthenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>>> RegisterAsync([FromForm] Business.Partner.Inputs.ClsRegisterCredentialsInput credentials)
    {
        var memberModel = await _AuthenticationService.RegisterAsync(credentials);

        return Created(string.Empty, memberModel);
    }
    [HttpPost("login")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.Partner.Models.ClsMemberAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput credentials)
    {
        var memberModel = await _AuthenticationService.LoginAsync(credentials);

        return Ok(memberModel);
    }
    [HttpPost("refresh-token")]
    public async Task<ActionResult<Database.Models.ClsTokensModel>> RefreshTokenAsync([FromBody] Business.Partner.Inputs.ClsRefreshTokenCredentialsInput credentials)
    {
        var tokensModel = await _AuthenticationService.RefreshTokenAsync(credentials);

        return Ok(tokensModel);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Partners")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.Partner.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AuthenticationService.LogoutAsync(credentials, new Database.Partner.Contexts.ClsMemberContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
            PartnerUuid = new Guid(User.FindFirst("PartnerUuid")!.Value),
        });

        return NoContent();
    }
}
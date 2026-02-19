using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.User.Controllers;

[ApiController]
[Route("api/user/account")]
public class ClsAccountController : Controller
{
    private readonly Business.User.Services.ClsAccountService _AccountService;

    public ClsAccountController(Business.User.Services.ClsAccountService accountService)
    {
        _AccountService = accountService;
    }

    [HttpPost("refresh-tokens")]
    public async Task<ActionResult<Database.Models.ClsTokensModel>> RefreshTokensAsync([FromBody] Business.User.Inputs.ClsRefreshTokenCredentialsInput credentials)
    {
        var tokensModel = await _AccountService.RefreshTokensAsync(credentials);

        return Ok(tokensModel);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Users")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.User.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AccountService.LogoutAsync(credentials, new Database.User.Contexts.ClsUserContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
        });

        return NoContent();
    }
}
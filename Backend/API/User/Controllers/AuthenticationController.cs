using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class ClsAuthenticationController : Controller
{
    private readonly Business.User.Services.ClsAuthenticationService _AuthenticationService;

    public ClsAuthenticationController(Business.User.Services.ClsAuthenticationService authenticationService)
    {
        _AuthenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.User.Models.ClsUserAccountModel>>> RegisterAsync([FromForm] Business.User.Inputs.ClsRegisterCredentialsInput credentials)
    {
        var userModel = await _AuthenticationService.RegisterAsync(credentials);

        return Created(string.Empty, userModel);
    }
    [HttpPost("login")]
    public async Task<ActionResult<Database.Models.ClsAccountModel<Database.User.Models.ClsUserAccountModel>>> LoginAsync([FromBody] Business.Inputs.ClsLoginCredentialsInput credentials)
    {
        var userModel = await _AuthenticationService.LoginAsync(credentials);

        return Ok(userModel);
    }
    [HttpPost("refresh-tokens")]
    public async Task<ActionResult<Database.Models.ClsTokensModel>> RefreshTokensAsync([FromBody] Business.User.Inputs.ClsRefreshTokenCredentialsInput credentials)
    {
        var tokensModel = await _AuthenticationService.RefreshTokensAsync(credentials);

        return Ok(tokensModel);
    }
    [HttpPost("logout")]
    [Authorize(AuthenticationSchemes = "Users")]
    public async Task<ActionResult> LogoutAsync([FromBody] Business.User.Inputs.ClsLogoutCredentialsInput credentials)
    {
        await _AuthenticationService.LogoutAsync(credentials, new Database.User.Contexts.ClsUserContext
        {
            Uuid = new Guid(User.FindFirst("Uuid")!.Value),
        });

        return NoContent();
    }
}
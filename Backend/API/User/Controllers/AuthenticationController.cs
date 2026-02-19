using Microsoft.AspNetCore.Mvc;

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
}
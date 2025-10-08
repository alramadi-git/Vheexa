using Microsoft.AspNetCore.Mvc;

using Business.Services.UserServices;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using Business.Services.AdminServices;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace API.Controllers.UserControllers;

[ApiController]
[Route("api/user/authentication")]
public class UserAuthenticationController : Controller
{
    private readonly ILogger<UserAuthenticationController> _Logger;
    private readonly UserAuthenticationService _UserService;

    public UserAuthenticationController(ILogger<UserAuthenticationController> logger, UserAuthenticationService userService)
    {
        _Logger = logger;
        _UserService = userService;
    }

    [HttpPost("signup")]
    public async Task<ActionResult> SignupAsync([FromBody] UserCreateRequestDTO userSignedupData)
    {
        try
        {
            await _UserService.SignupAsync(userSignedupData);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPost("signin")]
    public async Task<ActionResult<SuccessOneDTO<UserDTO>>> SigninAsync([FromBody] CredentialsDTO userSignedupData)
    {
        try
        {
            var user = await _UserService.SigninAsync(userSignedupData);

            return Ok(user);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
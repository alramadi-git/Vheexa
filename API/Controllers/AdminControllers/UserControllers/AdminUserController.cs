using Microsoft.AspNetCore.Mvc;

using Business.Services.AdminServices;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace API.Controllers.AdminControllers.UserControllers;

[ApiController]
[Route("api/admins/users")]
public class AdminUserController : Controller
{
    private readonly ILogger<AdminUserController> _Logger;
    private readonly UserService _UserService;

    public AdminUserController(ILogger<AdminUserController> logger, UserService userService)
    {
        _Logger = logger;
        _UserService = userService;
    }

    [HttpGet("{userID}")]
    public async Task<ActionResult<UserEntityDTO>> GetAsync(int userID)
    {
        try
        {
            var user = await _UserService.GetAsync(userID);

            return Ok(user);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{userID}")]
    public async Task<ActionResult> DeleteAsync(int userID)
    {
        try
        {
            await _UserService.DeleteAsync(1, userID);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<ActionResult<SuccessManyResponseDTO<UserEntityDTO>>> GetManyAsync([FromQuery] GetManyUsersSettingsDTO usersSettings)
    {
        try
        {
            var users = await _UserService.GetManyAsync(usersSettings);

            return Ok(users);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
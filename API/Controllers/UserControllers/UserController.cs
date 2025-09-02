using Microsoft.AspNetCore.Mvc;

using Business.Services.UserServices;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace API.Controllers.UserControllers;

[ApiController]
[Route("api/user")]
public class UserController : Controller
{
    private readonly ILogger<UserController> _Logger;
    private readonly UserService _UserService;

    public UserController(ILogger<UserController> logger, UserService userService)
    {
        _Logger = logger;
        _UserService = userService;
    }

    [HttpPost]
    public async Task<ActionResult> UpdateAsync([FromBody] UserUpdateRequestDTO userUpdatedData)
    {
        try
        {
            var userID = 1; // Logic get the user data from token in headers and cookies
            await _UserService.UpdateAsync(userID, userUpdatedData);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
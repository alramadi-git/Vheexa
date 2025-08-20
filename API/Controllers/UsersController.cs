using API.DTOs;
using Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : Controller
{

    private readonly ILogger<UsersController> _logger;
    private readonly UserService _userService;

    public UsersController(ILogger<UsersController> logger, UserService userService)
    {
        _logger = logger;
        _userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult> AddOneAsync(UserAddDTO newUser)
    {
        await _userService.AddOneAsync(UserAddDTO.ToDataAccessUserSchema(newUser));
        return Ok();
    }

    public async Task<ActionResult> UpdateOneAsync(int id, UserUpdateDTO updatedData)
    {
        await _userService.UpdateOneAsync(id, UserUpdateDTO.ToDataAccessUserSchema(updatedData));
        return Ok();
    }
    public async Task<ActionResult> DeleteOneAsync(int id)
    {
        await _userService.DeleteOneAsync(id);
        return Ok();
    }
}
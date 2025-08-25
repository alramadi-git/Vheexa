using Microsoft.AspNetCore.Mvc;

using Business.Services;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;

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

    [HttpPost]
    public async Task<ActionResult> AddOneAsync([FromBody] UserAddRequestDTO newUser)
    {
        try
        {
            await _UserService.AddOneAsync(newUser);

            return Created();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserEntityDTO>> GetOneAsync(int id)
    {
        try
        {
            var user = await _UserService.GetOneAsync(id);

            return Ok(user);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateOneAsync(int id, [FromBody] UserUpdateRequestDTO updatedData)
    {
        try
        {
            await _UserService.UpdateOneAsync(id, updatedData);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteOneAsync(int id)
    {
        try
        {
            await _UserService.DeleteOneAsync(id);

            return Ok();
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }

    [HttpGet]
    public async Task<ActionResult<SuccessManyResponseDTO<UserEntityDTO>>> GetManyAsync([FromQuery] UserFiltersRequestDTO filters, [FromQuery] UserSortingRequestDTO sorting, [FromQuery] PaginationRequestDTO pagination)
    {
        try
        {
            var users = await _UserService.GetManyAsync(filters, sorting, pagination);

            return Ok(users);
        }
        catch (Exception)
        {
            return BadRequest();
        }
    }
}
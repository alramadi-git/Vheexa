using Microsoft.AspNetCore.Mvc;

using FluentValidation;

using Business.User.Services;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;

namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class AuthenticationController : Controller
{
    private readonly AuthenticationService _AuthenticationService;

    public AuthenticationController(AuthenticationService authenticationService)
    {
        _AuthenticationService = authenticationService;
    }

    [HttpPost("signin")]
    [ProducesResponseType(typeof(SuccessOneDTO<UserDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessOneDTO<UserDTO>>> SigninAsync([FromBody] CredentialsDTO userSignedupData)
    {
        try
        {
            var user = await _AuthenticationService.SigninAsync(userSignedupData);

            return Ok(user);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors.Select(error => new Error(error.PropertyName, error.ErrorMessage)).ToArray();
            return BadRequest(new ExceptionDTO(STATUS_CODE.BAD_REQUEST, errors, ex.Message));
        }
        catch (ExceptionDTO ex)
        {
            return StatusCode((int)ex.StatusCode, ex);
        }
        catch (Exception ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            return StatusCode((int)STATUS_CODE.INTERNAL_SERVER_ERROR, new ExceptionDTO(STATUS_CODE.INTERNAL_SERVER_ERROR, message));
        }
    }
}
using Microsoft.AspNetCore.Mvc;

using FluentValidation;

using Business.User.Services;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;
using DataAccess.User.DTOs.Requests.Filters;

namespace API.User.Controllers;

[ApiController]
[Route("api/user/vehicles")]
public class VehicleController : Controller
{
    private readonly VehicleService _VehicleService;

    public VehicleController(VehicleService vehicleService)
    {
        _VehicleService = vehicleService;
    }

    [HttpGet("{uuid:guid}")]
    [ProducesResponseType(typeof(SuccessOneDTO<VehicleDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessOneDTO<VehicleDTO>>> GetOneAsync(Guid uuid)
    {
        try
        {
            var user = await _VehicleService.GetOneAsync(uuid);

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


    [HttpGet]
    [ProducesResponseType(typeof(SuccessManyDTO<VehicleDTO>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ExceptionDTO), StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessManyDTO<VehicleDTO>>> GetManyAsync([FromQuery] VehicleFiltersDTO filters, [FromQuery] PaginationFilterDTO pagination)
    {
        try
        {
            var user = await _VehicleService.GetManyAsync(filters, pagination);

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
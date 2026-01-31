using Microsoft.AspNetCore.Mvc;

using FluentValidation;

using API.Models;
using Business.User.Services;
using Database.Dtos;
using Database.Inputs;
using Database.Inputs.User;
using Database.Dtos.Partner;
using Database.Dtos.User;

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
    public async Task<ActionResult<ClsSuccessDTO<Database.Dtos.User.ClsVehicleModelDTO>>> GetOneAsync([FromRoute] Guid uuid)
    {
        try
        {
            var user = await _VehicleService.GetOneAsync(uuid);
            return Ok(user);
        }
        catch (ValidationException exception)
        {
            return BadRequest(new FailedModel(
                (int)HTTP_STATUS_CODE.BAD_REQUEST,
                exception.Message,
                exception.Errors.Select(error => new IssueExceptionDTO(error.PropertyName, error.ErrorMessage)).ToArray()
            ));
        }
        catch (ExceptionDTO exception)
        {
            var code = (int)exception.StatusCode;
            return StatusCode(code, new FailedModel(code, exception.Message));
        }
        catch (Exception exception)
        {
            var code = (int)HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return StatusCode(code, new FailedModel(code, exception.Message));
        }
    }


    [HttpGet]
    public async Task<ActionResult<ClsPaginationSuccessDTO<Database.Dtos.User.ClsVehicleModelDTO>>> GetManyAsync(
        [FromQuery] VehicleFiltersParameter filters,
        [FromQuery] PaginationParameter pagination
    )
    {
        try
        {
            var user = await _VehicleService.GetManyAsync(filters, pagination);
            return Ok(user);
        }
        catch (ValidationException exception)
        {
            return BadRequest(new FailedModel(
                (int)HTTP_STATUS_CODE.BAD_REQUEST,
                exception.Message,
                exception.Errors.Select(error => new IssueExceptionDTO(error.PropertyName, error.ErrorMessage)).ToArray()
            ));
        }
        catch (ExceptionDTO exception)
        {
            var code = (int)exception.StatusCode;
            return StatusCode(code, new FailedModel(code, exception.Message));
        }
        catch (Exception exception)
        {
            var code = (int)HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;
            return StatusCode(code, new FailedModel(code, exception.Message));
        }
    }
}
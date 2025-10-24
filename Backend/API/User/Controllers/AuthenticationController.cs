using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using FluentValidation;

using API.Options;
using API.Models;
using Business.User.Services;
using Database.DTOs;
using Database.Parameters;
using Database.User.DTOs;


namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class AuthenticationController : Controller
{
    private readonly JWTOptions _JWTOptions;
    private readonly AuthenticationService _AuthenticationService;


    public AuthenticationController(JWTOptions jWTOptions, AuthenticationService authenticationService)
    {
        _JWTOptions = jWTOptions;
        _AuthenticationService = authenticationService;
    }


    [HttpPost("login")]
    public async Task<ActionResult<SuccessOneDTO<AccountModel<UserDTO>>>> LoginAsync([FromBody] LoginCredentialsParameter userSignedupData)
    {
        try
        {
            var user = await _AuthenticationService.LoginAsync(userSignedupData);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _JWTOptions.Issuer,
                Audience = _JWTOptions.Audience,
                SigningCredentials = new SigningCredentials(_JWTOptions.SymmetricSecurityKey(), SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity([
                    new Claim("uuid", user.Data.UUID.ToString()),
                    new Claim("email", user.Data.Email.ToString()),
                ])
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var response = new SuccessOneDTO<AccountModel<UserDTO>>(new AccountModel<UserDTO>(user.Data, tokenString));
            return Ok(response);
        }
        catch (ValidationException exception)
        {
            return BadRequest(new FailedModel(
                (int)STATUS_CODE.BAD_REQUEST,
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
            var code = (int)STATUS_CODE.INTERNAL_SERVER_ERROR;
            return StatusCode(code, new FailedModel(code, exception.Message));
        }
    }
}
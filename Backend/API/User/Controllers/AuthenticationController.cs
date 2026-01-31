using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

using FluentValidation;
using API.Models;
using Database.Dtos;
using Database.Inputs;
using Business.User.Services;
using API.Configurations;
using Database.Dtos.User;
using Database.Dtos.Abstracts;


namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class AuthenticationController : Controller
{
    private readonly JwtSettings _JWTOptions;
    private readonly AuthenticationService _AuthenticationService;


    public AuthenticationController(JwtSettings jWTOptions, AuthenticationService authenticationService)
    {
        _JWTOptions = jWTOptions;
        _AuthenticationService = authenticationService;
    }


    [HttpPost("login")]
    public async Task<ActionResult<ClsSuccessDTO<AccountModel<ClsUserDTO>>>> LoginAsync([FromBody] LoginCredentialsParameter userSignedupData)
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

            var response = new ClsSuccessDTO<AccountModel<ClsUserDTO>>(new AccountModel<ClsUserDTO>(user.Data, tokenString));
            return Ok(response);
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
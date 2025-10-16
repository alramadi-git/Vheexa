using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FluentValidation;

using API.Models;
using Business.User.Services;
using DataAccess.User.DTOs.Requests;
using DataAccess.User.DTOs.Responses;
using API.User.Models;


namespace API.User.Controllers;

[ApiController]
[Route("api/user/authentication")]
public class AuthenticationController : Controller
{
    private readonly JWTOptions _JWTOptions;
    private readonly AuthenticationService _AuthenticationService;


    public AuthenticationController(
        JWTOptions jWTOptions,
        AuthenticationService authenticationService
    )
    {
        _JWTOptions = jWTOptions;
        _AuthenticationService = authenticationService;
    }

    [HttpPost("signin")]
    public async Task<ActionResult<SuccessOneDTO<UserModel>>> SigninAsync([FromBody] CredentialsDTO userSignedupData)
    {
        try
        {
            var user = await _AuthenticationService.SigninAsync(userSignedupData);

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

            var response = new SuccessOneDTO<UserModel>(new UserModel(user.Data, tokenString));
            return Ok(response);
        }
        catch (Exception ex)
        {
            var message = ex.InnerException?.Message ?? ex.Message;
            return StatusCode((int)STATUS_CODE.INTERNAL_SERVER_ERROR, new ErrorDTO(STATUS_CODE.INTERNAL_SERVER_ERROR, message));
        }
    }
}
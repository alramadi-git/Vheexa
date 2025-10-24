
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using API.Options;

using Business.Validations;
using Business.User.Services;
using Business.User.Validations;

using Database;
using Database.User.Repositories;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));

        var jwtOptions = builder.Configuration.GetSection("JWTOptions").Get<JWTOptions>()!;
        builder.Services.AddSingleton(jwtOptions);

        builder.Services.AddAuthentication()
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,

                    ValidateIssuer = true,
                    ValidIssuer = jwtOptions.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtOptions.Audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtOptions.SymmetricSecurityKey()
                };
            });

        builder.Services.AddScoped<PaginationValidation>();

        builder.Services.AddScoped<LoginCredentialsValidation>();
        builder.Services.AddScoped<AuthenticationService>();
        builder.Services.AddScoped<AuthenticationRepository>();

        builder.Services.AddScoped<VehicleFiltersValidation>();
        builder.Services.AddScoped<VehicleService>();
        builder.Services.AddScoped<VehicleRepository>();

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}


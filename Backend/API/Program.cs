
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Business.Validations;
using Business.User.Services;
using Business.User.Validations;

using Database;
using API.Configurations;
using API.Middlewares;
using Database.Repositories.User;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register configuration objects
        var APIKey = builder.Configuration.GetSection("ApiKeys").Get<ApiKeys>()!;
        builder.Services.AddSingleton<ApiKeys>(APIKey);

        var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()!;
        builder.Services.AddSingleton<JwtSettings>(jwtSettings);

        // Register middlewares
        builder.Services.AddScoped<FrontendAPIKeyMiddleware>();

        // Add Authentication (JWT)
        builder.Services.AddAuthentication()
        .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,

                    ValidateIssuer = true,
                    ValidIssuer = jwtSettings.Issuer,

                    ValidateAudience = true,
                    ValidAudience = jwtSettings.Audience,

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtSettings.SymmetricSecurityKey()
                };
            });


        // Register validations
        builder.Services.AddScoped<LoginCredentialsValidation>();

        builder.Services.AddScoped<VehicleFiltersValidation>();
        builder.Services.AddScoped<PaginationValidation>();


        // Register database
        builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));

        // Register business & data layer services
        builder.Services.AddScoped<AuthenticationService>();
        builder.Services.AddScoped<AuthenticationRepository>();

        builder.Services.AddScoped<VehicleService>();
        builder.Services.AddScoped<VehicleRepository>();

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

        app.UseMiddleware<FrontendAPIKeyMiddleware>();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}


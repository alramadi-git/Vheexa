using Microsoft.EntityFrameworkCore;

using Microsoft.OpenApi;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using System.Text;

using API.Middlewares;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register options
        var usersJwtSection = builder.Configuration.GetSection("Options:JwtOptions:UsersJwtOptions");
        var usersJwtOptions = usersJwtSection.Get<Database.User.Options.ClsAccessTokenOptions>()!;

        builder.Services.Configure<Database.User.Options.ClsAccessTokenOptions>(usersJwtSection);

        var partnersJwtSection = builder.Configuration.GetSection("Options:JwtOptions:PartnersJwtOptions");
        var partnersJwtOptions = partnersJwtSection.Get<Database.Partner.Options.ClsAccessTokenOptions>()!;

        builder.Services.Configure<Database.Partner.Options.ClsAccessTokenOptions>(partnersJwtSection);

        builder.Services.Configure<Business.Integrations.ClsImagekitIntegration.ClsImagekitOptions>(
          builder.Configuration.GetSection("Options:ImagekitOptions")
        );

        // Helpers
        builder.Services.AddScoped(typeof(Database.Helpers.ClsAccessTokenHelper<>));
        builder.Services.AddScoped<Database.Helpers.ClsRefreshTokenHelper>();

        // Register database
        builder.Services.AddDbContext<Database.AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSql")));

        // Register business layer 
        // Validators
        builder.Services.AddScoped<Business.Validations.Validators.ClsLoginCredentialsValidator>();
        builder.Services.AddScoped<Business.Validations.Validators.ClsLocationValidator>();
        builder.Services.AddScoped<Business.Validations.Validators.ClsPaginationFilterValidator>();

        builder.Services.AddScoped<Business.User.Validations.Validators.ClsRegisterCredentialsValidator>();
        builder.Services.AddScoped<Business.User.Validations.Validators.ClsRefreshTokenCredentialsValidator>();
        builder.Services.AddScoped<Business.User.Validations.Validators.ClsLogoutCredentialsValidator>();

        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRegisterCredentialsValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRefreshTokenCredentialsValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsLogoutCredentialsValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRoleInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRoleFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsBranchInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsBranchFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsOptionFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsOptionPaginationFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsMemberInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsMemberFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsVehicleModelInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsVehicleModelFilterValidator>();

        // Guards
        builder.Services.AddScoped<Business.User.Validations.Guards.ClsAuthenticationGuard>();
        builder.Services.AddScoped<Business.User.Validations.Guards.ClsAccountGuard>();

        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsAuthenticationGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsRoleGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsBranchGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsMemberGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsVehicleModelGuard>();

        // Integrations
        builder.Services.AddScoped<Business.Integrations.ClsImagekitIntegration>();

        // Services
        builder.Services.AddScoped<Business.User.Services.ClsAuthenticationService>();
        builder.Services.AddScoped<Business.User.Services.ClsAccountService>();

        builder.Services.AddScoped<Business.Partner.Services.ClsAuthenticationService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsOverviewService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsRoleService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsBranchService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsMemberService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsVehicleModelService>();

        // Register database layer 
        // Repositories 
        builder.Services.AddScoped<Database.User.Repositories.ClsAuthenticationRepository>();
        builder.Services.AddScoped<Database.User.Repositories.ClsAccountRepository>();

        builder.Services.AddScoped<Database.Partner.Repositories.ClsAuthenticationRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsOverviewRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsRoleRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsBranchRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsMemberRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsVehicleModelRepository>();

        // Register Exception
        builder.Services.AddProblemDetails();
        builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

        // Register Authentication
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer("Users", options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = usersJwtOptions.Issuer,
                ValidAudience = usersJwtOptions.Audience,
                ClockSkew = TimeSpan.Zero, // TO_REMOVE
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(usersJwtOptions.SecretKey))
            };

            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    context.HandleResponse();

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "text/plain";

                    if (context.AuthenticateFailure == null)
                    {
                        await context.Response.WriteAsync("Missing access token");
                    }
                    else if (context.AuthenticateFailure is SecurityTokenExpiredException)
                    {
                        await context.Response.WriteAsync("Expired access token");
                    }
                    else
                    {
                        await context.Response.WriteAsync("Invalid access token");
                    }
                },
                OnForbidden = async context =>
                  {
                      context.Response.StatusCode = StatusCodes.Status403Forbidden;

                      context.Response.ContentType = "text/plain";

                      await context.Response.WriteAsync("Forbidden");
                  }
            };
        })
        .AddJwtBearer("Partners", options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = partnersJwtOptions.Issuer,
                ValidAudience = partnersJwtOptions.Audience,
                ClockSkew = TimeSpan.Zero, // TO_REMOVE
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(partnersJwtOptions.SecretKey))
            };

            options.Events = new JwtBearerEvents
            {
                OnChallenge = async context =>
                {
                    context.HandleResponse();

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "text/plain";

                    if (context.AuthenticateFailure == null)
                    {
                        await context.Response.WriteAsync("Missing access token");
                    }
                    else if (context.AuthenticateFailure is SecurityTokenExpiredException)
                    {
                        await context.Response.WriteAsync("Expired access token");
                    }
                    else
                    {
                        await context.Response.WriteAsync("Invalid access token");
                    }
                },
                OnForbidden = async context =>
                {
                    context.Response.StatusCode = StatusCodes.Status403Forbidden;

                    context.Response.ContentType = "text/plain";

                    await context.Response.WriteAsync("Forbidden");
                }
            };
        });

        builder.Services.AddAuthorization(options =>
        {
            foreach (var permissionName in Enum.GetNames<Database.Partner.Enums.PERMISSION>())
            {
                options.AddPolicy(permissionName, policy => policy.RequireClaim("Permissions", permissionName));
            }
        });

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            options.CustomSchemaIds(type => type.FullName?.Replace("+", "_"));

            options.AddSecurityDefinition("Users", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Users JWT: Enter your user token"
            });

            options.AddSecurityDefinition("Partners", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Partners JWT: Enter your partner token"
            });

            options.AddSecurityRequirement(document =>
            {
                var requirement = new OpenApiSecurityRequirement
                {
                    [new OpenApiSecuritySchemeReference("Users", document)] = new List<string>(),
                    [new OpenApiSecuritySchemeReference("Partners", document)] = new List<string>()
                };
                return requirement;
            });
        });

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("VheexaPolicy", policy =>
            {
                if (builder.Environment.IsDevelopment())
                    policy
                    .WithOrigins("http://localhost:5173")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                if (builder.Environment.IsProduction())
                    policy
                    .WithOrigins("https://www.vheexa.vercel.app")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        var app = builder.Build();

        app.UseExceptionHandler();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("VheexaPolicy");

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}


using Microsoft.OpenApi;

using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;

using Microsoft.EntityFrameworkCore;

using API.Helpers;

using System.Text;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register options
        var usersJwtSection = builder.Configuration.GetSection("Options:JwtOptions:UsersJwtOptions");
        var usersJwtOptions = usersJwtSection.Get<User.Options.ClsJwtOptions>()!;

        builder.Services.Configure<User.Options.ClsJwtOptions>(usersJwtSection);

        var partnersJwtSection = builder.Configuration.GetSection("Options:JwtOptions:PartnersJwtOptions");
        var partnersJwtOptions = partnersJwtSection.Get<Partner.Options.ClsJwtOptions>()!;

        builder.Services.Configure<Partner.Options.ClsJwtOptions>(partnersJwtSection);

        builder.Services.Configure<Business.Integrations.ClsImagekitIntegration.ClsImagekitOptions>(
          builder.Configuration.GetSection("Options:ImagekitOptions")
        );

        // Helpers
        builder.Services.AddScoped(typeof(ClsJwtHelper<>));

        // Register database
        builder.Services.AddDbContext<Database.AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSql")));

        // Register business layer 
        // Validators
        builder.Services.AddScoped<Business.Validations.Validators.ClsLoginValidator>();
        builder.Services.AddScoped<Business.Validations.Validators.ClsPaginationFilterValidator>();
        builder.Services.AddScoped<Business.Validations.Validators.ClsLocationValidator>();

        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRegisterCredentialsValidator>();
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

        builder.Services.AddScoped<Business.User.Validations.Validators.ClsRegisterCredentialsValidator>();

        // Guards
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsAuthenticationGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsRoleGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsBranchGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsMemberGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsVehicleModelGuard>();

        builder.Services.AddScoped<Business.User.Validations.Guards.ClsAuthenticationGuard>();

        // Integrations
        builder.Services.AddScoped<Business.Integrations.ClsImagekitIntegration>();

        // Services
        builder.Services.AddScoped<Business.Partner.Services.ClsAuthenticationService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsOverviewService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsRoleService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsBranchService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsMemberService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsVehicleModelService>();

        builder.Services.AddScoped<Business.User.Services.ClsAuthenticationService>();

        // Register database layer 
        // Repositories 
        builder.Services.AddScoped<Database.Partner.Repositories.ClsAuthenticationRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsOverviewRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsRoleRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsBranchRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsMemberRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsVehicleModelRepository>();

        builder.Services.AddScoped<Database.User.Repositories.ClsAuthenticationRepository>();

        // Register Authentication
        // Register Authentication - ONE call with multiple schemes
        // Register Authentication with multiple schemes
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
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(usersJwtOptions.SecretKey))
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
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(partnersJwtOptions.SecretKey))
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

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("VheexaPolicy");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}


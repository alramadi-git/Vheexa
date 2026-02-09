using Microsoft.EntityFrameworkCore;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register options
        builder.Services.Configure<Business.Integrations.ClsImagekitIntegration.ClsImagekitOptions>(
            builder.Configuration.GetSection("ImagekitOptions")
        );

        // Register database
        builder.Services.AddDbContext<Database.AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSql")));

        // Register business layer
        // Validators
        builder.Services.AddScoped<Business.Validations.Validators.ClsLoginValidator>();
        builder.Services.AddScoped<Business.Validations.Validators.ClsPaginationFilterValidator>();

        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsBranchInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsBranchFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsMemberInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsMemberFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsOptionFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsOptionPaginationFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRegisterCredentialsValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRoleInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsRoleFilterValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsVehicleModelInputValidator>();
        builder.Services.AddScoped<Business.Partner.Validations.Validators.ClsVehicleModelFilterValidator>();

        // Guards
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsAuthenticationGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsRoleGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsBranchGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsMemberGuard>();
        builder.Services.AddScoped<Business.Partner.Validations.Guards.ClsVehicleModelGuard>();

        // Integrations
        builder.Services.AddScoped<Business.Integrations.ClsImagekitIntegration>();

        // Services
        builder.Services.AddScoped<Business.Partner.Services.ClsAuthenticationService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsOverviewService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsRoleService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsBranchService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsMemberService>();
        builder.Services.AddScoped<Business.Partner.Services.ClsVehicleModelService>();

        // Register database layer 
        // Repositories 
        builder.Services.AddScoped<Database.Partner.Repositories.ClsAuthenticationRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsOverviewRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsRoleRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsBranchRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsMemberRepository>();
        builder.Services.AddScoped<Database.Partner.Repositories.ClsVehicleModelRepository>();

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


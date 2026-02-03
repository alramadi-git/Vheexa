using Microsoft.EntityFrameworkCore;

namespace API;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Register options
        var Options = builder.Configuration.GetSection("Options").Get<ClsOption>();

        // Register database
        builder.Services.AddDbContext<Database.AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));

        // Register business layer
        // Validators
        builder.Services.AddScoped<ClsValidator>();

        // Guards
        builder.Services.AddScoped<ClsGuard>();

        // Integrations
        builder.Services.AddScoped<ClsIntegration>();

        // Services
        builder.Services.AddScoped<ClsService>();

        // Register database layer 
        // Repositories 
        builder.Services.AddScoped<ClsRepository>();

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


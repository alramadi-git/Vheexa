using Microsoft.EntityFrameworkCore;

using Business.Services.UserServices;

using DataAccess;
using DataAccess.Repositories.UserRepository;

var builder = WebApplication.CreateBuilder(args);
builder
.Configuration
.SetBasePath(Directory.GetCurrentDirectory())
.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
.AddEnvironmentVariables();

builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));

builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<UserAuthenticationRepository>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserAuthenticationService>();


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
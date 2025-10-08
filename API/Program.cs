using Microsoft.EntityFrameworkCore;

using API.Models;

using Business.User.Services;

using DataAccess;
using DataAccess.User.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder
.Configuration
.SetBasePath(Directory.GetCurrentDirectory())
.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
.AddEnvironmentVariables();

builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));
builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("StripeSettings"));

builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<AuthenticationRepository>();




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
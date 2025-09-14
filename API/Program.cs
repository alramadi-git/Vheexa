using Microsoft.EntityFrameworkCore;

using Business.Services.AdminServices;
using Business.Services.UserServices;
using Business.Services.PartnerServices;
using Business.Services.MemberServices;

using DataAccess;
using DataAccess.Repositories.AdminRepository;
using DataAccess.Repositories.UserRepository;
using DataAccess.Repositories.PartnerRepository;
using DataAccess.Repositories.MemberRepositories;

var builder = WebApplication.CreateBuilder(args);
builder
.Configuration
.SetBasePath(Directory.GetCurrentDirectory())
.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true)
.AddEnvironmentVariables();

builder.Services.AddDbContext<AppDBContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresSQL")));

builder.Services.AddScoped<AdminAuthenticationService>();
builder.Services.AddScoped<AdminService>();
builder.Services.AddScoped<AdminUserService>();
builder.Services.AddScoped<AdminRequestToBeAPartnerService>();

builder.Services.AddScoped<AdminAuthenticationRepository>();
builder.Services.AddScoped<AdminRepository>();
builder.Services.AddScoped<AdminUserRepository>();
builder.Services.AddScoped<AdminRequestToBeAPartnerRepository>();

builder.Services.AddScoped<UserAuthenticationService>();
builder.Services.AddScoped<UserService>();

builder.Services.AddScoped<UserAuthenticationRepository>();
builder.Services.AddScoped<UserRepository>();


builder.Services.AddScoped<PartnerAuthenticationService>();
builder.Services.AddScoped<PartnerService>();
builder.Services.AddScoped<PartnerMemberService>();
builder.Services.AddScoped<PartnerSupportedLocationService>();

builder.Services.AddScoped<PartnerAuthenticationRepository>();
builder.Services.AddScoped<PartnerRepository>();
builder.Services.AddScoped<PartnerMemberRepository>();
builder.Services.AddScoped<PartnerSupportedLocationRepository>();

builder.Services.AddScoped<MemberAuthenticationService>();
builder.Services.AddScoped<MemberService>();

builder.Services.AddScoped<MemberAuthenticationRepository>();
builder.Services.AddScoped<MemberRepository>();



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
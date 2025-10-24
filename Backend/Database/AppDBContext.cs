using Microsoft.EntityFrameworkCore;
using Database.Entities;

namespace Database;

public class AppDBContext : DbContext
{
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<LocationEntity> Locations { get; set; }

    public DbSet<HumanEntity> Humans { get; set; }

    public DbSet<UserEntity> Users { get; set; }

    public DbSet<PartnerEntity> Partners { get; set; }
    public DbSet<PartnerSupportedLocationEntity> PartnerSupportedLocations { get; set; }

    public DbSet<VehicleEntity> Vehicles { get; set; }
    public DbSet<VehicleImageEntity> VehicleImages { get; set; }
    public DbSet<VehicleColorEntity> VehicleColors { get; set; }

    public DbSet<VehicleInstanceEntity> VehicleInstances { get; set; }
    public DbSet<VehicleInstanceSupportedLocationEntity> VehicleInstanceSupportedLocations { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var uuidProp = entityType.FindProperty("UUID");
            if (uuidProp != null) modelBuilder.Entity(entityType.ClrType).HasKey("UUID");
        }

        base.OnModelCreating(modelBuilder);
    }
};

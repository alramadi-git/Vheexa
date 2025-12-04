using Microsoft.EntityFrameworkCore;
using Database.Entities;

namespace Database;

public class AppDBContext : DbContext
{

    public DbSet<HistoryEntity> Histories { get; set; }
    public DbSet<RoleEntity> Roles { get; set; }
    public DbSet<PermissionEntity> Permissions { get; set; }
    public DbSet<RolePermissionEntity> RolePermissions { get; set; }
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<LocationEntity> Locations { get; set; }
    public DbSet<HumanEntity> Humans { get; set; }
    public DbSet<UserEntity> Users { get; set; }
    public DbSet<PartnerEntity> Partners { get; set; }
    public DbSet<PartnerSettingsEntity> PartnersSettings { get; set; }
    public DbSet<PartnerRoleEntity> PartnerRoles { get; set; }
    public DbSet<BranchEntity> Branches { get; set; }
    public DbSet<MemberEntity> Members { get; set; }
    public DbSet<MemberHistoryEntity> MemberHistories { get; set; }
    public DbSet<VehicleModelEntity> VehicleModels { get; set; }
    public DbSet<VehicleImageEntity> VehicleImages { get; set; }
    public DbSet<VehicleColorEntity> VehicleColors { get; set; }
    public DbSet<VehicleInstanceEntity> VehicleInstances { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var uuidProperty = entityType.FindProperty("UUID");
            if (uuidProperty != null) modelBuilder.Entity(entityType.ClrType).HasKey("UUID");
        }

        base.OnModelCreating(modelBuilder);
    }
};

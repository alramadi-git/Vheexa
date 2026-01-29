using Microsoft.EntityFrameworkCore;
using Database.Entities;

namespace Database;

public class AppDBContext : DbContext
{

    public DbSet<ClsHistoryEntity> Histories { get; set; }
    public DbSet<ClsRoleEntity> Roles { get; set; }
    public DbSet<ClsPermissionEntity> Permissions { get; set; }
    public DbSet<ClsRolePermissionEntity> RolePermissions { get; set; }
    public DbSet<ClsLocationEntity> Locations { get; set; }
    public DbSet<ClsUserEntity> Users { get; set; }
    public DbSet<ClsPartnerEntity> Partners { get; set; }
    public DbSet<ClsPartnerRoleEntity> PartnerRoles { get; set; }
    public DbSet<ClsBranchEntity> Branches { get; set; }
    public DbSet<ClsMemberEntity> Members { get; set; }
    public DbSet<ClsMemberHistoryEntity> MemberHistories { get; set; }
    public DbSet<ClsVehicleModelEntity> VehicleModels { get; set; }
    public DbSet<ClsVehicleModelGalleryEntity> VehicleModelGalleries { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            var uuidProperty = entityType.FindProperty("Uuid");
            if (uuidProperty != null) modelBuilder.Entity(entityType.ClrType).HasKey("Uuid");
        }

        base.OnModelCreating(modelBuilder);
    }
};

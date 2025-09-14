using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDBContext : DbContext
{
    public DbSet<ImageEntity> Images { get; set; }

    public DbSet<LocationEntity> Addresses { get; set; }

    public DbSet<HumanEntity> Humans { get; set; }

    public DbSet<TaskEntity> Tasks { get; set; }

    /** Admin */
    public DbSet<AdminEntity> Admins { get; set; }
    public DbSet<AdminTaskEntity> AdminTasks { get; set; }

    /** User */
    public DbSet<UserEntity> Users { get; set; }

    /** Partner */
    public DbSet<PartnerEntity> Partners { get; set; }
    public DbSet<RequestToBeAPartnerEntity> RequestsToBeAPartner { get; set; }
    public DbSet<PartnerSupportedLocationEntity> PartnerSupportedLocations { get; set; }

    public DbSet<MemberEntity> Members { get; set; }
    public DbSet<MemberTaskEntity> MemberTasks { get; set; }

    /** Vehicle */
    public DbSet<VehicleEntity> Vehicles { get; set; }
    public DbSet<VehicleImageEntity> VehicleImages { get; set; }
    public DbSet<VehicleColorEntity> VehicleColors { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
};

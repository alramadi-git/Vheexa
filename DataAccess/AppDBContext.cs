using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDBContext : DbContext
{
    public DbSet<AddressEntity> Addresses { get; set; }
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<HumanEntity> Humans { get; set; }

    // public DbSet<Entities.TaskEntity> Tasks; { get; set; }
    // /** Admin */
    public DbSet<AdminEntity> Admins { get; set; }
    // public DbSet<AdminTaskEntity> AdminTasks { get; set; }

    // public DbSet<RatingEntity> Ratings { get; set; }
    // public DbSet<CommentEntity> Comments { get; set; }

    // /** User */
    public DbSet<UserEntity> Users { get; set; }
    // public DbSet<UserRatingEntity> UserRatings { get; set; }
    // public DbSet<UserCommentEntity> UserComments { get; set; }

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
};

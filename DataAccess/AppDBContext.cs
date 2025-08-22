using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDBContext : DbContext
{
    public DbSet<AddressEntity> Addresses { get; set; }
    public DbSet<ImageEntity> Images { get; set; }
    public DbSet<HumanEntity> Humans { get; set; }

    // public DbSet<Entities.TaskEntity> Tasks;

    // /** Admin */
    // public DbSet<AdminEntity> Admins;
    // public DbSet<AdminTaskEntity> AdminTasks;

    // public DbSet<RatingEntity> Ratings;
    // public DbSet<CommentEntity> Comments;

    // /** User */
    public DbSet<UserEntity> Users { get; set; }
    // public DbSet<UserRatingEntity> UserRatings;
    // public DbSet<UserCommentEntity> UserComments;

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
};

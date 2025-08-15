using DataAccess.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDBContext : DbContext
{
    public DbSet<Address> Addresses;
    public DbSet<Image> Images;
    public DbSet<Human> Humans;

    public DbSet<Entities.Task> Tasks;

    /** Admin */
    public DbSet<Admin> Admins;
    public DbSet<AdminTask> AdminTasks;

    public DbSet<Rating> Ratings;
    public DbSet<Comment> Comments;

    /** User */
    public DbSet<User> Users;
    public DbSet<UserRating> UserRatings;
    public DbSet<UserComment> UserComments;

    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
};

using Microsoft.EntityFrameworkCore;

namespace DataAccess;

public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
    {
    }
};

namespace DataAccess.Repositories.AdminRepository;

public class AdminRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

};
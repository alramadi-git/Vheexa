namespace DataAccess.Repositories.PartnerRepository;

public class PartnerRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

};
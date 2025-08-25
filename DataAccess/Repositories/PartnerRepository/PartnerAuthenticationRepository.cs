namespace DataAccess.Repositories.PartnerRepository;

public class PartnerAuthenticationRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerAuthenticationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

};
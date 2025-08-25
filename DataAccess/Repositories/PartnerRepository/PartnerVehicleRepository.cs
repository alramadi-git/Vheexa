namespace DataAccess.Repositories.PartnerRepository;

public class PartnerVehicleAdminRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerVehicleAdminRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

};
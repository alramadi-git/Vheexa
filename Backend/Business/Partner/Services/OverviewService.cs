namespace Business.Partner.Services;

public class ClsOverviewService
{
    private readonly Database.Partner.Repositories.ClsOverviewRepository _Repository;

    public ClsOverviewService(Database.Partner.Repositories.ClsOverviewRepository repository)
    {
        _Repository = repository;
    }

    public async Task<Database.Partner.Models.ClsOverviewModel> ReadOneAsync(Database.Partner.Contexts.ClsMemberContext memberContext)
    {
        var overview =  await _Repository.ReadOneAsync(memberContext);

        return overview;
    }
}
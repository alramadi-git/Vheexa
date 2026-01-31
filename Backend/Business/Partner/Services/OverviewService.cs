using Database.Partner.Repositories;

using Database.Partner.Contexts;

using Database.Partner.Dtos;

namespace Business.Partner.Services;

public class ClsOverviewService
{
    private readonly ClsOverviewRepository _Repository;


    public ClsOverviewService(ClsOverviewRepository repository)
    {
        _Repository = repository;
    }

    public async Task<ClsOverviewDto> ReadOneAsync(ClsMemberContext memberContext)
    {
        return await _Repository.ReadOneAsync(memberContext);
    }
}
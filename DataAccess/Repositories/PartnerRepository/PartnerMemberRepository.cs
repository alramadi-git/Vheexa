using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Identity;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerMemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerMemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync() { }
    public async Task GetAsync() { }
    public async Task GetManyAsync() { }
};
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Database.DTOs;
// using Database.Partner.DTOs;
using Database.Parameters;

namespace Database.Partner.Repositories;

public class MemberRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    /** TODO
        1. GetOne
        2. GetMany
        3. Add
        4. Update
        5. Delete
    */
};
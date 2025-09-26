using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleReturnRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleReturnRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

 };
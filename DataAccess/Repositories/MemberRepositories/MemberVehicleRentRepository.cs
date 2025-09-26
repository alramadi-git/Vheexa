using Microsoft.EntityFrameworkCore;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleRentRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleRentRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task Returned(int partnerID, int rentID)
    {
        var rentQuery = _AppDBContext.Rents
        .Include(rent => rent.Booking)
        .ThenInclude(booking => booking!.VehicleInstance)
        .ThenInclude(vehicleInstance => vehicleInstance!.Vehicle)
        .Where(rent =>
            rent.ID == rentID
            && rent.Booking!.VehicleInstance!.Vehicle!.PartnerID == partnerID
            && rent.Status == RENT_STATUS_OPTION_ENTITY.IN_USE
        );

        var rent = await rentQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such booking.");

        // start a transaction
        rent.Status = RENT_STATUS_OPTION_ENTITY.RETURNED;

        var dropoffTimestamp = DateTime.Now;
        var dropoffTimestampComparison = rent.Booking!.DropoffTimestamp.CompareTo(dropoffTimestamp);
        
        var status =
        dropoffTimestampComparison > 0
        ? RETURN_STATUS_OPTION_ENTITY.EARLY_RETURN
        : dropoffTimestampComparison == 0
        ? RETURN_STATUS_OPTION_ENTITY.ON_TIME
        : RETURN_STATUS_OPTION_ENTITY.EXCEEDED;

        var returnEntityEntry = _AppDBContext.Returns
        .Add(
            new ReturnEntity
            {
                RentID = rentID,
                DropoffTimestamp = dropoffTimestamp,
                Status = status,
                CreatedAt = DateTime.Now,
            }
        );

        // save transaction
        await _AppDBContext.SaveChangesAsync();
    }
};
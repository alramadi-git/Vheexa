using Microsoft.EntityFrameworkCore;

using DataAccess.ResponseDTOs;
using DataAccess.Entities;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleBookingRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleBookingRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task Accept(int partnerID, int bookingID)
    {
        var bookingQuery = _AppDBContext.Bookings
        .Include(booking => booking.VehicleInstance)
        .ThenInclude(vehicleInstance => vehicleInstance!.Vehicle)
        .Where(booking =>
            booking.ID == bookingID
            && booking.VehicleInstance!.Vehicle!.PartnerID == partnerID
            && booking.Status == BOOKING_STATUS_OPTION_ENTITY.PENDING
        );

        var booking = await bookingQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such booking.");

        // start a transaction
        booking.Status = BOOKING_STATUS_OPTION_ENTITY.ACCEPTED;

        var rentEntityEntry = _AppDBContext.Rents
        .Add(
            new RentEntity
            {
                BookingID = bookingID,
                PickupTimestamp = DateTime.Now,
                Status = RENT_STATUS_OPTION_ENTITY.IN_USE,
                CreatedAt = DateTime.Now,
            }
        );

        // save transaction
        await _AppDBContext.SaveChangesAsync();
    }
};
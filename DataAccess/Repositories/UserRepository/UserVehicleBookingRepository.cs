using System.Linq.Expressions;
using DataAccess.Entities;
using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories.UserRepository;

public class UserVehicleRentRepository
{
    private readonly AppDBContext _AppDBContext;

    public UserVehicleRentRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync(int userID, BookingCreateRequestDTO bookingData)
    {
        var vehicleInstanceQuery = _AppDBContext.VehicleInstances
        .Include(vehicleInstance => vehicleInstance.Vehicle)
        .Where(vehicleInstance =>
            vehicleInstance.ID == bookingData.VehicleInstanceID
            && vehicleInstance.InStock >= 1
            && vehicleInstance.IsPublished == true
            && vehicleInstance.IsDeleted == false
        );

        var vehicleInstance = await vehicleInstanceQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle instance.");

        var pickupLocationQuery = _AppDBContext.PartnerSupportedLocations
        .Where(pickupLocation =>
            pickupLocation.ID == bookingData.PickupLocationID
            && pickupLocation.PartnerID == vehicleInstance.Vehicle!.PartnerID
            && pickupLocation.IsPickup == true
            && pickupLocation.IsPublished == true
            && pickupLocation.IsDeleted == false
        );

        var dropoffLocationQuery = _AppDBContext.PartnerSupportedLocations
        .Where(dropoffLocation =>
            dropoffLocation.ID == bookingData.DropoffLocationID
            && dropoffLocation.PartnerID == vehicleInstance.Vehicle!.PartnerID
            && dropoffLocation.IsDropoff == true
            && dropoffLocation.IsPublished == true
            && dropoffLocation.IsDeleted == false
        );

        var pickupDropoffLocations = await Task.WhenAll(
            pickupLocationQuery.AsNoTracking().FirstOrDefaultAsync(),
            dropoffLocationQuery.AsNoTracking().FirstOrDefaultAsync()
        );

        var pickup = pickupDropoffLocations[0] ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such pickup location.");
        var dropoff = pickupDropoffLocations[1] ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such dropoff location.");

        _AppDBContext.Bookings
        .Add(new BookingEntity
        {
            UserID = userID,
            VehicleInstanceID = vehicleInstance.ID,
            Checkout = null,
            PickupLocationID = pickup.ID,
            DropoffLocationID = dropoff.ID,
            PickupTimestamp = bookingData.PickupTimestamp,
            DropoffTimestamp = bookingData.DropoffTimestamp,
            Status = BOOKING_STATUS_OPTION_ENTITY.PENDING,
            CreatedAt = DateTime.UtcNow,
        }
        );
    }
};
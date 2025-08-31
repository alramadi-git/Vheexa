using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.EntityDTOs;

namespace DataAccess.Repositories.PartnerRepository;

public class PartnerSupportedLocationRepository
{
    private readonly AppDBContext _AppDBContext;

    public PartnerSupportedLocationRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneResponseDTO<PartnerSupportedLocationEntityDTO>> GetAsync(int partnerID, int partnerSupportedLocationID)
    {
        var partnerSupportedLocationQuery = _AppDBContext.PartnerSupportedLocations
        .Where(partnerSupportedLocation =>
            partnerSupportedLocation.ID == partnerSupportedLocationID &&
            partnerSupportedLocation.PartnerID == partnerID
        );

        var partnerSupportedLocation = await partnerSupportedLocationQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such partner supported location.");

        return new(new(partnerSupportedLocation));
    }

    public async Task<SuccessManyResponseDTO<PartnerSupportedLocationEntityDTO>> GetManyAsync(GetManyPartnerSupportedLocationsSettingsRequestDTO partnerSupportedLocationsSettings)
    {
        var partnerSupportedLocationsQuery = _AppDBContext.PartnerSupportedLocations
        .Include(partnerSupportedLocation => partnerSupportedLocation.Address)
        .AsQueryable();

        // Filtering

        var partnerSupportedLocationTotalRecords = await partnerSupportedLocationsQuery.CountAsync();

        // switch (partnerSupportedLocationsSettings.Sorting.By)
        // {
        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.FULL_NAME:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
        //         .OrderBy(partnerSupportedLocation => partnerSupportedLocation.Human!.FirstName)
        //         .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Human!.MidName)
        //         .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Human!.LastName);
        //         break;

        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.AVERAGE_RATES:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.AverageRates);
        //         break;

        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.DATE_OF_BIRTH:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.Human!.DateOfBirth);
        //         break;

        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.UpdatedAt);
        //         break;

        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.DELETION:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.UpdatedAt);
        //         break;

        //     case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.CREATION:
        //         partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.CreatedAt);
        //         break;
        // }

        partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
        .Skip(partnerSupportedLocationsSettings.Pagination.RequestedPage)
        .Take((int)partnerSupportedLocationsSettings.Pagination.RecordsPerRequest);

        var partnerSupportedLocations = await partnerSupportedLocationsQuery
        .AsNoTracking()
        .Select(partnerSupportedLocations => new PartnerSupportedLocationEntityDTO(partnerSupportedLocations)).ToArrayAsync();


        return new(
            partnerSupportedLocations,
            new(partnerSupportedLocationTotalRecords, RECORDS_PER_REQUEST_OPTION_REQUEST_DTO._10, 1)
        );
    }
};
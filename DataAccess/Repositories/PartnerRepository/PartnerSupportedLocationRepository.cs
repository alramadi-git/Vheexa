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

    public async Task<SuccessManyResponseDTO<PartnerSupportedLocationEntityDTO>> GetManyAsync(int partnerID, GetManyPartnerSupportedLocationsSettingsRequestDTO partnerSupportedLocationsSettings)
    {
        var partnerSupportedLocationsQuery = _AppDBContext.PartnerSupportedLocations
        .Include(partnerSupportedLocation => partnerSupportedLocation.Address)
        .Where(partnerSupportedLocation => partnerSupportedLocation.PartnerID == partnerID)
        .AsQueryable();

        // Filtering

        var partnerSupportedLocationTotalRecords = await partnerSupportedLocationsQuery.CountAsync();

        if (partnerSupportedLocationsSettings.Sorting.Ascending == true)
        {
            switch (partnerSupportedLocationsSettings.Sorting.By)
            {
                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.ADDRESS:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
                    .OrderBy(partnerSupportedLocation => partnerSupportedLocation.Address!.Country)
                    .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Address!.City)
                    .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Address!.Street);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.PartnerID);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PICKUP:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.IsPickup);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.DROPOFF:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.IsDropoff);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PUBLICATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.IsPublished);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.UpdatedAt);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.CREATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.CreatedAt);
                    break;
            }
        }
        else
        {
            switch (partnerSupportedLocationsSettings.Sorting.By)
            {
                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.ADDRESS:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
                    .OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.Country)
                    .ThenByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.City)
                    .ThenByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.Street);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.PartnerID);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PICKUP:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.IsPickup);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.DROPOFF:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.IsDropoff);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PUBLICATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.IsPublished);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.UpdatedAt);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.CREATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.CreatedAt);
                    break;
            }
        }

        partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
        .Skip(partnerSupportedLocationsSettings.Pagination.RequestedPage)
        .Take((int)partnerSupportedLocationsSettings.Pagination.RecordsPerRequest);

        var partnerSupportedLocations = await partnerSupportedLocationsQuery
        .AsNoTracking()
        .Select(partnerSupportedLocations => new PartnerSupportedLocationEntityDTO(partnerSupportedLocations)).ToArrayAsync();


        return new(
            partnerSupportedLocations,
            new(partnerSupportedLocationTotalRecords, partnerSupportedLocationsSettings.Pagination.RecordsPerRequest, partnerSupportedLocationsSettings.Pagination.RequestedPage)
        );
    }
};
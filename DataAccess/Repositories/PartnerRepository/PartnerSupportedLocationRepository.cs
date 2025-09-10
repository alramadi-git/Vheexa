using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

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

    public async Task<SuccessManyResponseDTO<PartnerSupportedLocationEntityDTO>> GetManyAsync(int partnerID, PartnerSupportedLocationFiltrationRequestDTO partnerSupportedLocationsFilters)
    {
        var partnerSupportedLocationsQuery = _AppDBContext.PartnerSupportedLocations
        .Include(partnerSupportedLocation => partnerSupportedLocation.Address)
        .Where(partnerSupportedLocation => partnerSupportedLocation.PartnerID == partnerID);

        if (partnerSupportedLocationsFilters.IsPickup != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.IsPickup == partnerSupportedLocationsFilters.IsPickup);
        if (partnerSupportedLocationsFilters.IsDropoff != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.IsDropoff == partnerSupportedLocationsFilters.IsDropoff);

        if (partnerSupportedLocationsFilters.IsPublished == true) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.IsPublished == partnerSupportedLocationsFilters.IsPublished);
        else partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.IsPublished == partnerSupportedLocationsFilters.IsPublished);

        if (partnerSupportedLocationsFilters.IsDeleted == true)
        {
            partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
            .Where(partnerSupportedLocations => partnerSupportedLocations.IsDeleted == partnerSupportedLocationsFilters.IsDeleted);

            if (partnerSupportedLocationsFilters.DeletedAt != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.DeletedAt == partnerSupportedLocationsFilters.DeletedAt);
            else
            {
                if (partnerSupportedLocationsFilters.DeletedBefore != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.DeletedAt <= partnerSupportedLocationsFilters.DeletedBefore);
                if (partnerSupportedLocationsFilters.DeletedAfter != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.DeletedAt >= partnerSupportedLocationsFilters.DeletedAfter);
            }
        }

        if (partnerSupportedLocationsFilters.UpdatedAt != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.UpdatedAt == partnerSupportedLocationsFilters.UpdatedAt);
        else
        {
            if (partnerSupportedLocationsFilters.UpdatedBefore != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.UpdatedAt <= partnerSupportedLocationsFilters.UpdatedBefore);
            if (partnerSupportedLocationsFilters.UpdatedAfter != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.UpdatedAt >= partnerSupportedLocationsFilters.UpdatedAfter);
        }

        if (partnerSupportedLocationsFilters.CreatedAt != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.CreatedAt == partnerSupportedLocationsFilters.CreatedAt);
        else
        {
            if (partnerSupportedLocationsFilters.CreatedBefore != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.CreatedAt <= partnerSupportedLocationsFilters.CreatedBefore);
            if (partnerSupportedLocationsFilters.CreatedAfter != null) partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.Where(partnerSupportedLocations => partnerSupportedLocations.CreatedAt >= partnerSupportedLocationsFilters.CreatedAfter);
        }


        var partnerSupportedLocationTotalRecords = await partnerSupportedLocationsQuery.CountAsync();

        if (partnerSupportedLocationsFilters.Sorting.Ascending == true)
        {
            switch (partnerSupportedLocationsFilters.Sorting.By)
            {
                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderBy(partnerSupportedLocation => partnerSupportedLocation.PartnerID);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.LOCATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
                    .OrderBy(partnerSupportedLocation => partnerSupportedLocation.Address!.Country)
                    .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Address!.City)
                    .ThenBy(partnerSupportedLocation => partnerSupportedLocation.Address!.Street);
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
            switch (partnerSupportedLocationsFilters.Sorting.By)
            {
                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery.OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.PartnerID);
                    break;

                case PARTNER_SUPPORTED_LOCATION_SORTING_OPTION_REQUEST_DTO.LOCATION:
                    partnerSupportedLocationsQuery = partnerSupportedLocationsQuery
                    .OrderByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.Country)
                    .ThenByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.City)
                    .ThenByDescending(partnerSupportedLocation => partnerSupportedLocation.Address!.Street);
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
        .Skip(partnerSupportedLocationsFilters.Pagination.RequestedPage)
        .Take((int)partnerSupportedLocationsFilters.Pagination.RecordsPerRequest);

        var partnerSupportedLocations = await partnerSupportedLocationsQuery
        .AsNoTracking()
        .Select(partnerSupportedLocations => new PartnerSupportedLocationEntityDTO(partnerSupportedLocations)).ToArrayAsync();


        return new(
            partnerSupportedLocations,
            new(partnerSupportedLocationTotalRecords, partnerSupportedLocationsFilters.Pagination.RecordsPerRequest, partnerSupportedLocationsFilters.Pagination.RequestedPage)
        );
    }
};
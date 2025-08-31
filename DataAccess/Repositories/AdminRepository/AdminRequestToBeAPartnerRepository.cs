using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs;
using DataAccess.EntityDTOs;
using DataAccess.ResponseDTOs;

namespace DataAccess.Repositories.AdminRepository;

public class AdminRequestToBeAPartnerRepository
{
    private readonly AppDBContext _AppDBContext;

    public AdminRequestToBeAPartnerRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task<SuccessOneResponseDTO<RequestToBeAPartnerEntityDTO>> GetAsync(int requestToBeAPartnerID)
    {
        var requestToBeAPartnerQuery = _AppDBContext.RequestsToBeAPartner
        .Include(requestToBeAPartner => requestToBeAPartner.Partner).ThenInclude(partner => partner!.Image)
        .Where(requestToBeAPartner => requestToBeAPartner.ID == requestToBeAPartnerID);

        var requestToBeAPartner = await requestToBeAPartnerQuery.AsNoTracking().FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such request to be a partner.");

        return new(new(requestToBeAPartner));
    }

    public async Task UpdateAsync(int adminID, UpdateRequestToBeAPartnerDTO updatedRequestToBeAPartnerData)
    {
        var requestToBeAPartnerQuery = _AppDBContext.RequestsToBeAPartner
        .Where(requestToBeAPartner => requestToBeAPartner.ID == updatedRequestToBeAPartnerData.ID && requestToBeAPartner.Status == Entities.REQUEST_TO_BE_A_PARTNER_STATUS.PENDING);

        var requestToBeAPartner = await requestToBeAPartnerQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such request to be a partner.");

        requestToBeAPartner.Status = updatedRequestToBeAPartnerData.Status;

        var adminQuery = _AppDBContext.Admins
        .Where((admin) => admin.ID == adminID);

        var admin = await adminQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such admin.");

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(
        new Entities.TaskEntity
        {
            Action = Entities.TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = Entities.TASK_TABLE_OPTION_ENTITY.REQUESTS_TO_BE_A_PARTNER,
            RowID = updatedRequestToBeAPartnerData.ID,
        });

        var adminTaskEntityEntry = _AppDBContext.AdminTasks
        .Add(
        new Entities.AdminTaskEntity
        {
            Admin = admin,
            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.UtcNow,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task<SuccessManyResponseDTO<RequestToBeAPartnerEntityDTO>> GetManyAsync(GetManyRequestsToBeAPartnerSettingsRequestDTO requestsToBeAPartnerSettings)
    {
        var requestToBeAPartnerQuery = _AppDBContext.RequestsToBeAPartner
        .AsQueryable();

        if (requestsToBeAPartnerSettings.Filters.PartnerID != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.PartnerID == requestsToBeAPartnerSettings.Filters.PartnerID);

        if (requestsToBeAPartnerSettings.Filters.Status != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.Status == requestsToBeAPartnerSettings.Filters.Status);

        if (requestsToBeAPartnerSettings.Filters.UpdatedAt != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt == requestsToBeAPartnerSettings.Filters.UpdatedAt);
        else
        {
            if (requestsToBeAPartnerSettings.Filters.UpdatedBefore != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt <= requestsToBeAPartnerSettings.Filters.UpdatedBefore);
            if (requestsToBeAPartnerSettings.Filters.UpdatedAfter != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt >= requestsToBeAPartnerSettings.Filters.UpdatedAfter);
        }

        if (requestsToBeAPartnerSettings.Filters.CreatedAt != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt == requestsToBeAPartnerSettings.Filters.CreatedAt);
        else
        {
            if (requestsToBeAPartnerSettings.Filters.CreatedBefore != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt <= requestsToBeAPartnerSettings.Filters.CreatedBefore);
            if (requestsToBeAPartnerSettings.Filters.CreatedAfter != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt >= requestsToBeAPartnerSettings.Filters.CreatedAfter);
        }

        var requestToBeAPartnerTotalFoundRecords = await requestToBeAPartnerQuery.CountAsync();

        if (requestsToBeAPartnerSettings.Sorting.Ascending == true)
        {
            switch (requestsToBeAPartnerSettings.Sorting.By)
            {
                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderBy(requestToBeAPartner => requestToBeAPartner.CreatedAt);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderBy(requestToBeAPartner => requestToBeAPartner.UpdatedAt);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.STATUS:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderBy(requestToBeAPartner => requestToBeAPartner.Status);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderBy(requestToBeAPartner => requestToBeAPartner.PartnerID);
                    break;
            }
        }
        else
        {
            switch (requestsToBeAPartnerSettings.Sorting.By)
            {
                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.CREATION:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderByDescending(requestToBeAPartner => requestToBeAPartner.CreatedAt);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.MODIFICATION:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderByDescending(requestToBeAPartner => requestToBeAPartner.UpdatedAt);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.STATUS:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderByDescending(requestToBeAPartner => requestToBeAPartner.Status);
                    break;

                case REQUEST_TO_BE_A_PARTNER_SORTING_OPTION_REQUEST_DTO.PARTNER_ID:
                    requestToBeAPartnerQuery = requestToBeAPartnerQuery
                    .OrderByDescending(requestToBeAPartner => requestToBeAPartner.PartnerID);
                    break;
            }
        }

        requestToBeAPartnerQuery = requestToBeAPartnerQuery
        .Skip(requestsToBeAPartnerSettings.Pagination.RequestedPage)
        .Take((int)requestsToBeAPartnerSettings.Pagination.RecordsPerRequest);

        var requestToBeAPartners = await requestToBeAPartnerQuery
        .AsNoTracking()
        .Select(requestToBeAPartner => new RequestToBeAPartnerEntityDTO(requestToBeAPartner)).ToArrayAsync();

        return new(
            requestToBeAPartners,
            new(requestToBeAPartnerTotalFoundRecords, requestsToBeAPartnerSettings.Pagination.RecordsPerRequest, requestsToBeAPartnerSettings.Pagination.RequestedPage)
        );
    }
};
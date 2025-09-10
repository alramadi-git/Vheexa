using Microsoft.EntityFrameworkCore;

using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;
using DataAccess.RequestDTOs.FiltrationRequestDTOs;
using DataAccess.ResponseDTOs.EntityResponseEntityDTOs;

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

    public async Task UpdateAsync(int adminID, int requestToBeAPartnerID, RequestToBeAPartnerUpdateRequestDTO requestToBeAPartnerUpdatedData)
    {
        var requestToBeAPartnerQuery = _AppDBContext.RequestsToBeAPartner
        .Where(requestToBeAPartner => requestToBeAPartner.ID == requestToBeAPartnerID && requestToBeAPartner.Status == Entities.REQUEST_TO_BE_A_PARTNER_STATUS.PENDING);

        var requestToBeAPartner = await requestToBeAPartnerQuery.FirstOrDefaultAsync() ??
        throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such request to be a partner.");

        requestToBeAPartner.Status = requestToBeAPartnerUpdatedData.Status;

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
            RowID = requestToBeAPartnerID,
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

    public async Task<SuccessManyResponseDTO<RequestToBeAPartnerEntityDTO>> GetManyAsync(RequestToBeAPartnerFiltrationRequestDTO requestsToBeAPartnerFiltration)
    {
        var requestToBeAPartnerQuery = _AppDBContext.RequestsToBeAPartner
        .AsQueryable();

        if (requestsToBeAPartnerFiltration.PartnerID != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.PartnerID == requestsToBeAPartnerFiltration.PartnerID);

        if (requestsToBeAPartnerFiltration.Status != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.Status == requestsToBeAPartnerFiltration.Status);

        if (requestsToBeAPartnerFiltration.UpdatedAt != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt == requestsToBeAPartnerFiltration.UpdatedAt);
        else
        {
            if (requestsToBeAPartnerFiltration.UpdatedBefore != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt <= requestsToBeAPartnerFiltration.UpdatedBefore);
            if (requestsToBeAPartnerFiltration.UpdatedAfter != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.UpdatedAt >= requestsToBeAPartnerFiltration.UpdatedAfter);
        }

        if (requestsToBeAPartnerFiltration.CreatedAt != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt == requestsToBeAPartnerFiltration.CreatedAt);
        else
        {
            if (requestsToBeAPartnerFiltration.CreatedBefore != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt <= requestsToBeAPartnerFiltration.CreatedBefore);
            if (requestsToBeAPartnerFiltration.CreatedAfter != null) requestToBeAPartnerQuery = requestToBeAPartnerQuery.Where(requestToBeAPartner => requestToBeAPartner.CreatedAt >= requestsToBeAPartnerFiltration.CreatedAfter);
        }

        var requestToBeAPartnerTotalFoundRecords = await requestToBeAPartnerQuery.CountAsync();

        if (requestsToBeAPartnerFiltration.Sorting.Ascending == true)
        {
            switch (requestsToBeAPartnerFiltration.Sorting.By)
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
            switch (requestsToBeAPartnerFiltration.Sorting.By)
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
        .Skip(requestsToBeAPartnerFiltration.Pagination.RequestedPage)
        .Take((int)requestsToBeAPartnerFiltration.Pagination.RecordsPerRequest);

        var requestToBeAPartners = await requestToBeAPartnerQuery
        .AsNoTracking()
        .Select(requestToBeAPartner => new RequestToBeAPartnerEntityDTO(requestToBeAPartner)).ToArrayAsync();

        return new(
            requestToBeAPartners,
            new(requestToBeAPartnerTotalFoundRecords, requestsToBeAPartnerFiltration.Pagination.RecordsPerRequest, requestsToBeAPartnerFiltration.Pagination.RequestedPage)
        );
    }
};
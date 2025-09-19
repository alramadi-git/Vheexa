using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleImageRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleImageRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync(int memberID, int vehicleID, VehicleImageCreateRequestDTO vehicleImageData)
    {
        var imageEntityEntry = _AppDBContext.Images
        .Add(new ImageEntity
        {
            URL = vehicleImageData.URL,
        });

        _AppDBContext.VehicleImages
        .Add(new VehicleImageEntity
        {
            VehicleID = vehicleID,
            Image = imageEntityEntry.Entity,

            IsPublished = false,
            IsDeleted = false,
        });

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(new TaskEntity
        {
            Action = TASK_ACTION_OPTION_ENTITY.CREATE,

            Table = TASK_TABLE_OPTION_ENTITY.VEHICLES,
            RowID = vehicleID,
        });

        _AppDBContext.MemberTasks
        .Add(new MemberTaskEntity
        {
            MemberID = memberID,
            Task = taskEntityEntry.Entity,
            CreatedAt = DateTime.UtcNow,
        });

        await _AppDBContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int memberID, int vehicleID, VehicleImageUpdateRequestDTO vehicleImageUpdatedData)
    {
        var vehicleImageQuery = _AppDBContext.VehicleImages
        .Include(vehicleImage => vehicleImage.Image)
        .Where(vehicleImage =>
            vehicleImage.ID == vehicleID
            && vehicleImage.IsDeleted == false
        );

        var vehicleImage = await vehicleImageQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle instancemage.");

        vehicleImage.Image!.URL = vehicleImageUpdatedData.URL;

        await _AppDBContext.SaveChangesAsync();
    }
    public async Task PublishedAsync(int memberID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.VehicleImages
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.IsPublished == false
            && vehicle.IsDeleted == false
        );

        var vehicle = await vehicleQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(new TaskEntity
        {
            Action = TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = TASK_TABLE_OPTION_ENTITY.VEHICLES,
            RowID = vehicleID,
        });

        var memberTaskEntityEntry = _AppDBContext.MemberTasks
        .Add(new MemberTaskEntity
        {
            MemberID = memberID,

            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.UtcNow,
        });

        vehicle.IsPublished = true;
        await _AppDBContext.SaveChangesAsync();
    }
    public async Task UnPublishedAsync(int memberID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.VehicleImages
        .Where(vehicle =>
            vehicle.ID == vehicleID
            && vehicle.IsPublished == true
            && vehicle.IsDeleted == false
        );

        var vehicle = await vehicleQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle.");

        var taskEntityEntry = _AppDBContext.Tasks
        .Add(new TaskEntity
        {
            Action = TASK_ACTION_OPTION_ENTITY.UPDATE,

            Table = TASK_TABLE_OPTION_ENTITY.VEHICLES,
            RowID = vehicleID,
        });

        var memberTaskEntityEntry = _AppDBContext.MemberTasks
        .Add(new MemberTaskEntity
        {
            MemberID = memberID,

            Task = taskEntityEntry.Entity,

            CreatedAt = DateTime.UtcNow,
        });

        vehicle.IsPublished = false;
        await _AppDBContext.SaveChangesAsync();
    }
};
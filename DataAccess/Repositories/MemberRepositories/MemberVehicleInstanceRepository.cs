using Microsoft.EntityFrameworkCore;

using DataAccess.RequestDTOs.CreateRequestDTOs;
using DataAccess.Entities;
using DataAccess.ResponseDTOs;
using DataAccess.RequestDTOs.UpdateRequestDTOs;

namespace DataAccess.Repositories.MemberRepositories;

public class MemberVehicleInstanceRepository
{
    private readonly AppDBContext _AppDBContext;

    public MemberVehicleInstanceRepository(AppDBContext appDBContext)
    {
        _AppDBContext = appDBContext;
    }

    public async Task AddAsync(int memberID, int vehicleID, VehicleInstanceCreateRequestDTO vehicleInstanceData)
    {
        var ColorEntityEntry = _AppDBContext.Colors
        .Add(new ColorEntity
        {
            Name = vehicleInstanceData.Color.Name,
            HexCode = vehicleInstanceData.Color.HexCode,
        });

        _AppDBContext.VehicleInstances
        .Add(new VehicleInstanceEntity
        {
            VehicleID = vehicleID,
            Color = ColorEntityEntry.Entity,

            InStock = vehicleInstanceData.InStock,
            InUse = vehicleInstanceData.InUse,

            IsPublished = false,
            IsDeleted = false,
            
            UpdatedAt = DateTime.UtcNow,
            CreatedAt = DateTime.UtcNow,
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

    public async Task UpdateAsync(int memberID, int vehicleID, VehicleInstanceUpdateRequestDTO vehicleInstanceUpdatedData)
    {
        var vehicleInstanceQuery = _AppDBContext.VehicleInstances
        .Include(vehicleInstance => vehicleInstance.Color)
        .Where(vehicleInstance =>
            vehicleInstance.ID == vehicleID
            && vehicleInstance.IsDeleted == false
        );

        var vehicleInstance = await vehicleInstanceQuery
        .FirstOrDefaultAsync() ?? throw new ErrorResponseDTO(ERROR_RESPONSE_DTO_STATUS_CODE.NOT_FOUND, "No such vehicle instance.");

        vehicleInstance.Color!.Name = vehicleInstanceUpdatedData.Color.Name;
        vehicleInstance.Color.HexCode = vehicleInstanceUpdatedData.Color.HexCode;

        vehicleInstance.InStock = vehicleInstanceUpdatedData.InStock;
        vehicleInstance.InUse = vehicleInstanceUpdatedData.InUse;

        vehicleInstance.UpdatedAt = DateTime.UtcNow;
        
        await _AppDBContext.SaveChangesAsync();
    }

    public async Task PublishedAsync(int memberID, int vehicleID)
    {
        var vehicleQuery = _AppDBContext.VehicleInstances
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
        var vehicleQuery = _AppDBContext.VehicleInstances
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
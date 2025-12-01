using Database.Entities;

namespace Database.Parameters.User;

public class SearchFilterDTO : AbstractFilterParameter<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == "") return entities;

        return entities
        .Where(ent =>
            ent.Name.ToLower().Contains(Value.ToLower())
            || ent.Description.ToLower().Contains(Value.ToLower())
            || ent.Tags.Any(tag => tag.ToLower().Contains(Value.ToLower()))
        );
    }
}

public class TransmissionFilterDTO : AbstractFilterParameter<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == "") return entities;

        return entities.Where(ent => ent.Transmission.ToLower().Contains(Value.ToLower()));
    }
}
public class FuelFilterDTO : AbstractFilterParameter<string, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == "") return entities;

        return entities.Where(ent => ent.Fuel.ToLower().Contains(Value.ToLower()));
    }
}

public class MinCapacityFilterDTO : AbstractFilterParameter<int, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == 0) return entities;

        return entities.Where(ent => ent.Capacity >= Value);
    }
}
public class MaxCapacityFilterDTO : AbstractFilterParameter<int, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == 0) return entities;

        return entities.Where(ent => ent.Capacity <= Value);
    }
}


public class MinPriceFilterDTO : AbstractFilterParameter<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == 0) return entities;

        return entities.Where(ent => ent.Price >= Value);
    }
}
public class MaxPriceFilterDTO : AbstractFilterParameter<double, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == 0) return entities;

        return entities.Where(ent => ent.Price <= Value);
    }
}

public class HasDiscountFilterDTO : AbstractFilterParameter<bool, VehicleEntity>
{
    public override IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        if (Value == false) return entities;

        return entities.Where(ent => ent.Discount > 0);
    }
}


public class VehicleFiltersParameter
{
    public SearchFilterDTO Search { get; set; } = new SearchFilterDTO { Value = "" };
    public TransmissionFilterDTO Transmission { get; set; } = new TransmissionFilterDTO { Value = "" };
    public FuelFilterDTO Fuel { get; set; } = new FuelFilterDTO { Value = "" };

    public MinCapacityFilterDTO MinCapacity { get; set; } = new MinCapacityFilterDTO { Value = 0, };
    public MaxCapacityFilterDTO MaxCapacity { get; set; } = new MaxCapacityFilterDTO { Value = 0, };

    public MinPriceFilterDTO MinPrice { get; set; } = new MinPriceFilterDTO { Value = 0, };
    public MaxPriceFilterDTO MaxPrice { get; set; } = new MaxPriceFilterDTO { Value = 0, };

    public HasDiscountFilterDTO HasDiscount { get; set; } = new HasDiscountFilterDTO { Value = false, };

    public IQueryable<VehicleEntity> Apply(IQueryable<VehicleEntity> entities)
    {
        var filters = entities;
        filters = Search.Apply(filters);
        filters = Transmission.Apply(filters);
        filters = Fuel.Apply(filters);

        filters = MinCapacity.Apply(filters);
        filters = MaxCapacity.Apply(filters);

        filters = MinPrice.Apply(filters);
        filters = MaxPrice.Apply(filters);

        filters = HasDiscount.Apply(filters);

        return filters;
    }
};
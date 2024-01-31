using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipment;
using Equiprent.Entities.Business.Manufacturers;

namespace Equiprent.Data.CustomQueries.Equipments
{
    public static class EquipmentQueries
    {
        public static string GetEquipmentsQuery()
        {
            var equipmentsAlias = "e";
            var manufacturersAlias = "m";

            return $@"
                SELECT
                    {equipmentsAlias}.{nameof(Equipment.Id)},
                    {manufacturersAlias}.{nameof(Manufacturer.Id)} AS {nameof(EquipmentListQueryModel.ManufacturerId)},
                    {manufacturersAlias}.{nameof(Manufacturer.Name)} AS {nameof(EquipmentListQueryModel.ManufacturerName)},
                    {equipmentsAlias}.{nameof(Equipment.Name)},
                    {equipmentsAlias}.{nameof(Equipment.PricePerDay)},
                    {equipmentsAlias}.{nameof(Equipment.PricePerDay)},
                    {equipmentsAlias}.{nameof(Equipment.TypeId)},
                    '' AS {nameof(EquipmentListQueryModel.TypeName)}
                FROM
                    {nameof(ApplicationDbContext.Equipments)} {equipmentsAlias}
                INNER JOIN
                    {nameof(ApplicationDbContext.Manufacturers)} {manufacturersAlias} ON {manufacturersAlias}.{nameof(Manufacturer.Id)} = {equipmentsAlias}.{nameof(Equipment.ManufacturerId)}
                WHERE
                    {equipmentsAlias}.{nameof(Equipment.IsDeleted)} = 0
            ";
        }
    }
}

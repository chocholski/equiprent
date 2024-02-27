using Equiprent.Data.CustomQueries.Builders;
using Equiprent.Data.CustomQueries.Builders.Join;
using Equiprent.Data.CustomQueries.Builders.Where;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipment;
using Equiprent.Entities.Business.Manufacturers;

namespace Equiprent.Data.CustomQueries.Queries.Equipments
{
    public static class EquipmentQueries
    {
        public static string GetEquipmentsQuery(ApplicationDbContext dbContext)
        {
            var equipmentTableName = nameof(ApplicationDbContext.Equipments);
            var manufacturerTableName = nameof(ApplicationDbContext.Manufacturers);

            var baseEquipmentTableColumn = new CustomQueryColumn(nameof(Equipment.Id));
            var baseManufacturerTableJoinColumn = new CustomQueryColumn(nameof(Equipment.ManufacturerId)) with
            {
                JoinedForeignKey = nameof(Equipment.ManufacturerId),
                JoinedTable = new JoinedTable(manufacturerTableName, nameof(Manufacturer.Id), nameof(Manufacturer.Id), JoinTypeEnum.Inner) with
                {
                    ColumnAlias = nameof(EquipmentListQueryModel.ManufacturerId),
                    TableAlias = "m"
                }
            };

            var query = new CustomQueryBuilder(dbContext, tableName: nameof(ApplicationDbContext.Equipments), tableAlias: "e")
                .AddSelectColumn(baseEquipmentTableColumn)
                .AddSelectColumnWithJoin(baseManufacturerTableJoinColumn)
                .AddSelectColumnWithJoin(baseManufacturerTableJoinColumn with
                {
                    JoinedTable = baseManufacturerTableJoinColumn.JoinedTable with
                    {
                        ColumnName = nameof(Manufacturer.Name),
                        ColumnAlias = nameof(EquipmentListQueryModel.ManufacturerName),
                    }
                })
                .AddSelectColumn(baseEquipmentTableColumn with { ColumnName = nameof(Equipment.Name) })
                .AddSelectColumn(baseEquipmentTableColumn with { ColumnName = nameof(Equipment.PricePerDay) })
                .AddSelectColumn(baseEquipmentTableColumn with { ColumnName = nameof(Equipment.SerialNumber) })
                .AddSelectColumn(baseEquipmentTableColumn with { ColumnName = nameof(Equipment.TypeId) })
                .AddEmptySelectColumnWithAlias(nameof(EquipmentListQueryModel.TypeName))
                .Where(new WhereClause(equipmentTableName, nameof(Equipment.IsDeleted), WhereOuterLogicalOperatorEnum.And, WhereOperatorEnum.Equals, Condition: "0"))
                .Build();

            return query;
        }
    }
}

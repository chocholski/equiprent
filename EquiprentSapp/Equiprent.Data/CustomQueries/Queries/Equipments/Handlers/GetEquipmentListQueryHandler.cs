using Equiprent.Data.CustomQueries.Builders.Join;
using Equiprent.Data.CustomQueries.Builders.Where;
using Equiprent.Data.CustomQueries.Builders;
using Equiprent.Data.CustomQueries.Queries.Equipments.Requests;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Manufacturers;
using MediatR;
using System.Threading;
using Equiprent.Entities.Business.Equipments;

namespace Equiprent.Data.CustomQueries.Queries.Equipments.Handlers
{
    public class GetEquipmentListQueryHandler : IRequestHandler<GetEquipmentListQueryRequest, string>
    {
        public async Task<string> Handle(GetEquipmentListQueryRequest request, CancellationToken cancellationToken)
        {
            var equipmentTableName = nameof(ApplicationDbContext.Equipments);
            var manufacturerTableName = nameof(ApplicationDbContext.Manufacturers);

            var baseEquipmentTableColumn = new CustomQueryColumn(nameof(Equipment.Id));
            var baseManufacturerTableJoinColumn = new CustomQueryColumn(nameof(Equipment.ManufacturerId)) with
            {
                JoinedForeignKey = nameof(Equipment.ManufacturerId),
                JoinedTable = new JoinedTable(
                    Name: manufacturerTableName,
                    ColumnKey: nameof(Manufacturer.Id),
                    ColumnName: nameof(Manufacturer.Id),
                    JoinType: JoinTypeEnum.Inner)
                with
                {
                    ColumnAlias = nameof(EquipmentListQueryModel.ManufacturerId),
                    TableAlias = "m",
                }
            };

            var query = new CustomQueryBuilder(request.DbContext, tableName: equipmentTableName, tableAlias: "e")
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

            return await Task.FromResult(query);
        }
    }
}

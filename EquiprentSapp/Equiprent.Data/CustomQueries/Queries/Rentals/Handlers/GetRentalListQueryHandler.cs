using Equiprent.Data.CustomQueries.Builders;
using Equiprent.Data.CustomQueries.Builders.Join;
using Equiprent.Data.CustomQueries.Builders.Where;
using Equiprent.Data.CustomQueries.Queries.Rentals.Requests;
using Equiprent.Data.CustomQueryTypes.Rentals;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.Users;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.Rentals;
using MediatR;
using System.Threading;

namespace Equiprent.Data.CustomQueries.Queries.Rentals.Handlers
{
    public class GetRentalListQueryHandler : IRequestHandler<GetRentalListQueryRequest, string>
    {
        public async Task<string> Handle(GetRentalListQueryRequest request, CancellationToken cancellationToken)
        {
            var rentalTableName = nameof(ApplicationDbContext.Rentals);
            var clientTableName = nameof(ApplicationDbContext.Clients);

            var baseRentalTableColumn = new CustomQueryColumn(nameof(Rental.Id));
            var baseRenterTableJoinColumn = new CustomQueryColumn(nameof(Rental.RenterId)) with
            {
                JoinedForeignKey = nameof(Rental.RenterId),
                JoinedTable = new JoinedTable(
                    Name: clientTableName,
                    ColumnKey: nameof(Client.Id),
                    ColumnName: nameof(Client.Id),
                    JoinType: JoinTypeEnum.Inner)
                with
                {
                    ColumnAlias = nameof(RentalListQueryModel.RenterId),
                    TableAlias = "renters",
                }
            };
            var baseRentierTableJoinColumn = new CustomQueryColumn(nameof(Rental.RentierId)) with
            {
                JoinedForeignKey = nameof(Rental.RentierId),
                JoinedTable = new JoinedTable(
                    Name: clientTableName,
                    ColumnKey: nameof(Client.Id),
                    ColumnName: nameof(Client.Id),
                    JoinType: JoinTypeEnum.Inner)
                with
                {
                    ColumnAlias = nameof(RentalListQueryModel.RentierId),
                    TableAlias = "rentiers",
                }
            };
            var baseUserResponsibleForHandlingTableJoinColumn = new CustomQueryColumn(nameof(Rental.UserResponsibleForHandlingId)) with
            {
                JoinedForeignKey = nameof(Rental.UserResponsibleForHandlingId),
                JoinedTable = new JoinedTable(
                    Name: nameof(ApplicationDbContext.Users),
                    ColumnKey: nameof(User.Id),
                    ColumnName: nameof(User.Id),
                    JoinType: JoinTypeEnum.Left)
                with
                {
                    ColumnAlias = nameof(RentalListQueryModel.UserResponsibleForHandlingId),
                    TableAlias = "u",
                }
            };

            var query = new CustomQueryBuilder(request.DbContext, tableName: rentalTableName, tableAlias: "r")
                .AddSelectColumn(baseRenterTableJoinColumn with { ColumnName = nameof(Rental.CategoryId) })
                .AddSelectColumn(baseRentalTableColumn with { ColumnName = nameof(Rental.End) })
                .AddSelectColumn(baseRentalTableColumn)
                .AddSelectColumn(baseRentalTableColumn with { ColumnName = nameof(Rental.Number) })
                .AddSelectColumnWithJoin(baseRenterTableJoinColumn)
                .AddSelectColumnWithJoin(baseRenterTableJoinColumn with
                {
                    JoinedTable = baseRenterTableJoinColumn.JoinedTable with
                    {
                        ColumnName = nameof(Client.Name),
                        ColumnAlias = nameof(RentalListQueryModel.RenterName),
                    }
                })
                .AddSelectColumnWithJoin(baseRentierTableJoinColumn)
                .AddSelectColumnWithJoin(baseRentierTableJoinColumn with
                {
                    JoinedTable = baseRentierTableJoinColumn.JoinedTable with
                    {
                        ColumnName = nameof(Client.Name),
                        ColumnAlias = nameof(RentalListQueryModel.RentierName),
                    }
                })
                .AddSelectColumn(baseRentalTableColumn with { ColumnName = nameof(Rental.Start) })
                .AddSelectColumnWithJoin(baseUserResponsibleForHandlingTableJoinColumn)
                .AddSelectColumnWithJoin(baseUserResponsibleForHandlingTableJoinColumn with
                {
                    JoinedTable = baseUserResponsibleForHandlingTableJoinColumn.JoinedTable with
                    {
                        ColumnName = nameof(User.FirstName),
                        ColumnAlias = nameof(RentalListQueryModel.UserResponsibleForHandlingFirstName),
                    }
                })
                .AddSelectColumnWithJoin(baseUserResponsibleForHandlingTableJoinColumn with
                {
                    JoinedTable = baseUserResponsibleForHandlingTableJoinColumn.JoinedTable with
                    {
                        ColumnName = nameof(User.LastName),
                        ColumnAlias = nameof(RentalListQueryModel.UserResponsibleForHandlingLastName),
                    }
                })
                .Where(new WhereClause(rentalTableName, nameof(Rental.IsDeleted), WhereOuterLogicalOperatorEnum.And, WhereOperatorEnum.Equals, Condition: "0"))
                .Build();

            return await Task.FromResult(query);
        }
    }
}

using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.EquipmentById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers
{
    public class GetEquipmentByIdHandler : IRequestHandler<GetEquipmentByIdRequest, EquipmentByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetEquipmentByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<EquipmentByIdResponse?> Handle(GetEquipmentByIdRequest request, CancellationToken cancellationToken = default)
        {
            var equipment = await _dbContext.Equipments
                .Where(e => e.Id == request.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (equipment is null)
                return null;

            var result = equipment.Adapt<EquipmentByIdResponse>();

            return result;
        }
    }
}

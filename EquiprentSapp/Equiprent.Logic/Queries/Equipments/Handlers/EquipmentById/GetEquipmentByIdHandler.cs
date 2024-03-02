using Equiprent.Data.DbContext;
using Equiprent.Extensions;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.EquipmentById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.EquipmentById
{
    public class GetEquipmentByIdHandler : IRequestHandler<GetEquipmentByIdRequest, EquipmentByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMediator _mediator;

        public GetEquipmentByIdHandler(
            ApplicationDbContext dbContext,
            IMediator mediator)
        {
            _dbContext = dbContext;
            _mediator = mediator;
        }

        public async Task<EquipmentByIdResponse?> Handle(GetEquipmentByIdRequest request, CancellationToken cancellationToken = default)
        {
            var equipment = await _dbContext.Equipments
                .Where(e => e.Id == request.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (equipment is null)
                return null;

            var result = equipment.Adapt<EquipmentByIdResponse>();

            var equipmentPhotos = (await _mediator.Send(new GetEquipmentPhotosByEquipmentIdRequest(equipment.Id), cancellationToken))?.Photos;
            if (!equipmentPhotos.IsNullOrEmpty())
                result.Photos = equipmentPhotos!;

            return result;
        }
    }
}

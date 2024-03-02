using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses;
using Equiprent.Logic.Queries.Equipments.Responses.EquipmentPhotosByEquipmentId;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.EquipmentPhotosByEquipmentId
{
    public class GetEquipmentPhotosByEquipmentIdHandler : IRequestHandler<GetEquipmentPhotosByEquipmentIdRequest, EquipmentPhotosByEquipmentIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetEquipmentPhotosByEquipmentIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<EquipmentPhotosByEquipmentIdResponse?> Handle(GetEquipmentPhotosByEquipmentIdRequest request, CancellationToken cancellationToken)
        {
            var equipmentPhotos = await _dbContext.EquipmentPhotos
                .Where(photo =>
                    !photo.IsDeleted &&
                    photo.EquipmentId == request.EquipmentId)
                .ToListAsync(cancellationToken);

            return new EquipmentPhotosByEquipmentIdResponse
            {
                Photos = equipmentPhotos
                    .Select(photo => new EquipmentPhotoResponse
                    {
                        FileName = photo.FileName,
                        Id = photo.Id,
                        IsMainThumbnail = photo.IsMainThumbnail,
                    })
                    .ToList()
            };
        }
    }
}

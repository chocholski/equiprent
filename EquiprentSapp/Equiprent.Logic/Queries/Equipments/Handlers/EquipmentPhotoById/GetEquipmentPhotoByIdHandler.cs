using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.EquipmentPhotoById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.EquipmentPhotoById
{
    public class GetEquipmentPhotoByIdHandler : IRequestHandler<GetEquipmentPhotoByIdRequest, EquipmentPhotoByIdReponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IEquipmentPhotoService _equipmentPhotoService;

        public GetEquipmentPhotoByIdHandler(
            ApplicationDbContext dbContext,
            IEquipmentPhotoService equipmentPhotoService)
        {
            _dbContext = dbContext;
            _equipmentPhotoService = equipmentPhotoService;
        }

        public async Task<EquipmentPhotoByIdReponse?> Handle(GetEquipmentPhotoByIdRequest request, CancellationToken cancellationToken)
        {
            var equipmentPhoto = await _dbContext.EquipmentPhotos
                .Where(photo =>
                    !photo.IsDeleted &&
                    photo.Id == request.PhotoId)
                .SingleOrDefaultAsync(cancellationToken);

            if (equipmentPhoto is null)
                return null;

            var equipmentPhotoLoadingResult = await _equipmentPhotoService.LoadFileAsync(equipmentPhoto.RelativePath, equipmentPhoto.FileName);
            if (equipmentPhotoLoadingResult is null || !equipmentPhotoLoadingResult.Status.IsSuccess())
            {
                return null;
            }

            var response = new EquipmentPhotoByIdReponse
            {
                File = Convert.ToBase64String(equipmentPhotoLoadingResult.File!),
                FileName = equipmentPhotoLoadingResult.FileName
            };

            return response;
        }
    }
}

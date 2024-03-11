using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationImplementations.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
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
        private readonly IEquipmentPhotoService _equipmentPhotoService;

        public GetEquipmentPhotosByEquipmentIdHandler(
            ApplicationDbContext dbContext,
            IEquipmentPhotoService equipmentPhotoService)
        {
            _dbContext = dbContext;
            _equipmentPhotoService = equipmentPhotoService;
        }

        public async Task<EquipmentPhotosByEquipmentIdResponse?> Handle(GetEquipmentPhotosByEquipmentIdRequest request, CancellationToken cancellationToken)
        {
            var equipmentPhotos = await _dbContext.EquipmentPhotos
                .Where(photo =>
                    !photo.IsDeleted &&
                    photo.EquipmentId == request.EquipmentId)
                .OrderBy(photo => photo.CreatedOn)
                .ToListAsync(cancellationToken);

            var response = new EquipmentPhotosByEquipmentIdResponse();

            foreach (var photo in equipmentPhotos)
            {
                var equipmentPhotoLoadingResult = await _equipmentPhotoService.LoadFileWithThumbnailAsync(
                    photo: new EquipmentPhotoLoadingModel
                    {
                        FileNameWithExtension = photo.FileName,
                        Path = photo.RelativePath
                    },
                    targetDimensions: new PhotoDimensions(height: 50, width: 55));

                if (equipmentPhotoLoadingResult is null ||
                    !equipmentPhotoLoadingResult.Status.IsSuccess() ||
                    !equipmentPhotoLoadingResult.ThumbnailLoadingResult.Status.IsSuccess())
                {
                    continue;
                }

                var encodedThumbnail = _equipmentPhotoService.GetEncodedImage(equipmentPhotoLoadingResult.ThumbnailLoadingResult.Thumbnail!, photo.FileName);
                if (string.IsNullOrEmpty(encodedThumbnail))
                    return null;

                response.Photos.Add(new EquipmentPhotoResponse
                {
                    FileName = photo.FileName,
                    Id = photo.Id,
                    IsMainThumbnail = photo.IsMainThumbnail,
                    ThumbnailFile = encodedThumbnail,
                });
            }

            return response;
        }
    }
}

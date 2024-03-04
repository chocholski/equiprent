using Equiprent.ApplicationImplementations.Equipments.Photos;
using Equiprent.ApplicationImplementations.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses;
using Equiprent.Logic.Queries.Equipments.Responses.EquipmentPhotosByEquipmentId;
using MediatR;
using System.IO;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.EquipmentPhotosByEquipmentId
{
#pragma warning disable CA1416 // Validate platform compatibility
    public class GetEquipmentPhotosByEquipmentIdHandler : IRequestHandler<GetEquipmentPhotosByEquipmentIdRequest, EquipmentPhotosByEquipmentIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IEquipmentPhotoService _equipmentPhotoService;
        private readonly IFileEncodingResolver _fileEncodingResolver;

        public GetEquipmentPhotosByEquipmentIdHandler(
            ApplicationDbContext dbContext,
            IEquipmentPhotoService equipmentPhotoService,
            IFileEncodingResolver fileEncodingResolver)
        {
            _dbContext = dbContext;
            _equipmentPhotoService = equipmentPhotoService;
            _fileEncodingResolver = fileEncodingResolver;
        }

        public async Task<EquipmentPhotosByEquipmentIdResponse?> Handle(GetEquipmentPhotosByEquipmentIdRequest request, CancellationToken cancellationToken)
        {
            var equipmentPhotos = await _dbContext.EquipmentPhotos
                .Where(photo =>
                    !photo.IsDeleted &&
                    photo.EquipmentId == request.EquipmentId)
                .ToListAsync(cancellationToken);

            var response = new EquipmentPhotosByEquipmentIdResponse();

            foreach (var photo in equipmentPhotos)
            {
                var equipmentPhotoLoadingResult = await _equipmentPhotoService.LoadFileWithThumbnailAsync(
                    photo: new EquipmentPhotoLoadingModel
                    {
                        FileName = photo.FileName,
                        RelativePath = photo.RelativePath
                    },
                    targetDimensions: new PhotoDimensions(height: 50, width: 55));

                if (equipmentPhotoLoadingResult is null ||
                    !equipmentPhotoLoadingResult.Status.IsSuccess() ||
                    !equipmentPhotoLoadingResult.ThumbnailLoadingResult.Status.IsSuccess())
                {
                    continue;
                }

                using var memoryStream = new MemoryStream();
                var encoder = _fileEncodingResolver.GetEncoderForFileName(photo.FileName);
                if (encoder is null)
                    continue;

                equipmentPhotoLoadingResult.ThumbnailLoadingResult.Thumbnail!.Save(memoryStream, encoder, encoderParams: null);
                response.Photos.Add(new EquipmentPhotoResponse
                {
                    FileName = photo.FileName,
                    Id = photo.Id,
                    IsMainThumbnail = photo.IsMainThumbnail,
                    ThumbnailFile = Convert.ToBase64String(memoryStream.ToArray()),
                });
            }

            return response;
        }
    }
#pragma warning restore CA1416 // Validate platform compatibility
}

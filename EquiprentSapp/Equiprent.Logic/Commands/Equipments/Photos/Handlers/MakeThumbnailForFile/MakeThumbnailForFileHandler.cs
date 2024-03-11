using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.Logic.Commands.Equipments.Photos.Requests.MakeThumbnailForFile;
using Equiprent.Logic.Commands.Equipments.Photos.Responses.ThumbnailForFile;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Photos.Handlers.MakeThumbnailForFile
{
    public class MakeThumbnailForFileHandler : IRequestHandler<MakeThumbnailForFileRequest, ThumbnailForFileResponse?>
    {
        private readonly IEquipmentPhotoService _equipmentPhotoService;

        public MakeThumbnailForFileHandler(IEquipmentPhotoService equipmentPhotoService)
        {
            _equipmentPhotoService = equipmentPhotoService;
        }

        public async Task<ThumbnailForFileResponse?> Handle(MakeThumbnailForFileRequest request, CancellationToken cancellationToken)
        {
            var thumbnail = _equipmentPhotoService.MakeThumbnailFromEncodedFile(request.File);
            if (thumbnail is null)
                return null;

            var encodedThumbnail = _equipmentPhotoService.GetEncodedImage(thumbnail, request.FileName);
            if (string.IsNullOrEmpty(encodedThumbnail))
                return null;

            return new ThumbnailForFileResponse
            {
                File = encodedThumbnail,
            };
        }
    }
}

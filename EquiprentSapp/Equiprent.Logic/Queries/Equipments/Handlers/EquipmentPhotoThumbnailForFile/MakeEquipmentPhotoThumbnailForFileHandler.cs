using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.Logic.Commands.Equipments.Requests.MakeEquipmentPhotoThumbnailForFile;
using Equiprent.Logic.Commands.Equipments.Responses.EquipmentPhotoThumbnailForFile;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.EquipmentPhotoThumbnailForFile
{
    public class MakeEquipmentPhotoThumbnailForFileHandler : IRequestHandler<MakeEquipmentPhotoThumbnailForFileRequest, EquipmentPhotoThumbnailForFileResponse?>
    {
        private readonly IEquipmentPhotoService _equipmentPhotoService;

        public MakeEquipmentPhotoThumbnailForFileHandler(IEquipmentPhotoService equipmentPhotoService)
        {
            _equipmentPhotoService = equipmentPhotoService;
        }

        public async Task<EquipmentPhotoThumbnailForFileResponse?> Handle(MakeEquipmentPhotoThumbnailForFileRequest request, CancellationToken cancellationToken)
        {
            var thumbnail = _equipmentPhotoService.MakeThumbnailFromEncodedFile(request.File);
            if (thumbnail is null)
                return null;

            var encodedThumbnail = _equipmentPhotoService.GetEncodedImage(thumbnail, request.FileName);
            if (string.IsNullOrEmpty(encodedThumbnail))
                return null;

            return new EquipmentPhotoThumbnailForFileResponse
            {
                File = encodedThumbnail,
            };
        }
    }
}

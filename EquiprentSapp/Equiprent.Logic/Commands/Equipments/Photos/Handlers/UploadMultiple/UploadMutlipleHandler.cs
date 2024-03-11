using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Saving;
using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;
using Equiprent.Logic.Commands.Equipments.Photos.Requests.Create;
using Equiprent.Logic.Commands.Equipments.Photos.Requests.UploadMultiple;
using Equiprent.Logic.Commands.Equipments.Photos.Responses.UploadMultiple;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Equipments.Photos.Handlers.UploadMultiple
{
    public class UploadMutlipleHandler : IRequestHandler<UploadMultipleRequest, UploadMultipleResponse?>
    {
        private readonly IEquipmentPhotoService _equipmentPhotoService;
        private readonly IMediator _mediator;

        public UploadMutlipleHandler(
            IEquipmentPhotoService equipmentPhotoService,
            IMediator mediator)
        {
            _equipmentPhotoService = equipmentPhotoService;
            _mediator = mediator;
        }

        public async Task<UploadMultipleResponse?> Handle(UploadMultipleRequest request, CancellationToken cancellationToken)
        {
            var response = new UploadMultipleResponse();

            foreach (var photo in request.Photos)
            {
                var equipmentPhotoSavingResult = await _equipmentPhotoService.SaveEncodedFileAsync(new EquipmentPhotoSavingModel
                {
                    EncodedFile = photo.File!,
                    FileNameWithExtension = photo.FileName!,
                    Path = $"{request.EquipmentId}.zip",
                });

                if (!equipmentPhotoSavingResult.Status.IsSuccess())
                    continue;

                var thumbnail = _equipmentPhotoService.MakeThumbnailFromEncodedFile(photo.File!);
                if (thumbnail is null)
                    continue;

                var encodedThumbnail = _equipmentPhotoService.GetEncodedImage(thumbnail, photo.FileName!);
                if (string.IsNullOrEmpty(encodedThumbnail))
                    continue;

                photo.ThumbnailFile = encodedThumbnail;

                var equipmentPhotoCreationResult = await _mediator.Send(new CreateRequest
                {
                    EquipmentId = request.EquipmentId,
                    FileName = equipmentPhotoSavingResult.FileNameWithExtension,
                    RelativePath = equipmentPhotoSavingResult.RelativePath,
                },
                cancellationToken);

                if (equipmentPhotoCreationResult.IsOk())
                {
                    response.UploadedPhotos.Add(photo);
                }
            }

            return response;
        }
    }
}

using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationImplementations.Photos;
using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Photos;
using Microsoft.Extensions.Configuration;
using System.Drawing;

namespace Equiprent.ApplicationImplementations.Equipments.Photos
{
    public class EquipmentPhotoService : IEquipmentPhotoService
    {
        private readonly IConfiguration _configuration;
        private readonly IFileArchivingService _fileArchivingService;
        private readonly IFileService _fileService;
        private readonly IPhotoResizeCalculator _photoResizeCalculator;

        public EquipmentPhotoService(
            IConfiguration configuration,
            IFileArchivingService fileArchivingService,
            IFileService fileService,
            IPhotoResizeCalculator photoResizeCalculator)
        {
            _configuration = configuration;
            _fileArchivingService = fileArchivingService;
            _fileService = fileService;
            _photoResizeCalculator = photoResizeCalculator;
        }

        public async Task<IEquipmentPhotoLoadingResult> LoadFileWithoutThumbnailAsync(IEquipmentPhotoLoadingModel photo)
        {
            return await LoadFileAsync(photo);
        }

        public async Task<IEquipmentPhotoLoadingResult> LoadFileWithThumbnailAsync(IEquipmentPhotoLoadingModel photo, IDimensionable targetDimensions)
        {
            var result = await LoadFileAsync(photo);
            if (!result.Status.IsSuccess())
                return result;

            result.ThumbnailLoadingResult = GetThumbnailOfImageFileWithDimensions(result.FileLoadingResult!, targetDimensions);
            if (!result.ThumbnailLoadingResult.Status.IsSuccess())
            {
                result.Status = result.ThumbnailLoadingResult.Status.ToEquipmentPhotoLoadingStatus();
                return result;
            }

            result.Status = EquipmentPhotoLoadingResultEnum.Success;
            return result;
        }

        private Image? GetThumbnail(byte[] imageFile, IDimensionable targetDimensions)
        {
            using var imageMemoryStream = new MemoryStream(imageFile);
            if (imageMemoryStream is null)
                return null;

            var thumbnail = Image.FromStream(imageMemoryStream);
            if (thumbnail is null)
                return null;

            var resizingDimensions = _photoResizeCalculator.CalculateResizingDimensions(
                source: new PhotoDimensions(thumbnail.Height, thumbnail.Width),
                target: new PhotoDimensions(targetDimensions.Height, targetDimensions.Width));

            if (resizingDimensions is null)
                return null;

            return new Bitmap(thumbnail, (int)resizingDimensions.Width, (int)resizingDimensions.Height);
        }

        private IEquipmentPhotoThumbnailLoadingResult GetThumbnailOfImageFileWithDimensions(IFileLoadingResult fileLoadingResult, IDimensionable targetDimensions)
        {
            var result = new EquipmentPhotoThumbnailLoadingResult();

            if (!fileLoadingResult.Status.IsSuccess())
                return result with { Status = fileLoadingResult.Status.ToEquipmentPhotoThumbnailLoadingResult() };

            var thumbnail = GetThumbnail(fileLoadingResult.File!, targetDimensions);
            if (thumbnail is null)
                return result with { Status = EquipmentPhotoThumbnailLoadingResultEnum.Error };

            result.Thumbnail = thumbnail;

            return result with { Status = EquipmentPhotoThumbnailLoadingResultEnum.Success };
        }

        private async Task<IEquipmentPhotoLoadingResult> LoadFileAsync(IEquipmentPhotoLoadingModel photo)
        {
            var result = new EquipmentPhotoLoadingResult(_configuration, _fileService, photo);
            if (!Directory.Exists(result.DefaultPath) || !File.Exists(result.ZipPath))
            {
                return result with { Status = EquipmentPhotoLoadingResultEnum.NotFound };
            }

            result.FileArchiveLoadingResult = _fileArchivingService.Load(result.ZipPath, result.UnZipPath, result.FileName);
            if (!result.FileArchiveLoadingResult.Status.IsSuccess())
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            result.FileLoadingResult = await _fileService.LoadAsync(result.FileArchiveLoadingResult);
            if (!result.FileLoadingResult.Status.IsSuccess())
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            return result with { Status = EquipmentPhotoLoadingResultEnum.Success };
        }
    }
}

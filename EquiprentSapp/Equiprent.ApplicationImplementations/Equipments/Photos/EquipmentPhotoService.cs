using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Saving;
using Equiprent.ApplicationImplementations.Photos;
using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading.Thumbnails;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Saving;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;
using Equiprent.ApplicationInterfaces.Images;
using Equiprent.ApplicationInterfaces.Photos;
using Microsoft.Extensions.Configuration;
using SkiaSharp;

namespace Equiprent.ApplicationImplementations.Equipments.Photos
{
#pragma warning disable CA1822 // Mark members as static
    public class EquipmentPhotoService : IEquipmentPhotoService
    {
        public static readonly IDimensionable DefaultThumbnailDimensions = new PhotoDimensions(height: 50, width: 55);

        private readonly IConfiguration _configuration;
        private readonly IFileArchivingService _fileArchivingService;
        private readonly IImageEncodingResolver _fileEncodingResolver;
        private readonly IFileService _fileService;
        private readonly IImageService _imageService;
        private readonly IPhotoResizeCalculator _photoResizeCalculator;

        public EquipmentPhotoService(
            IConfiguration configuration,
            IFileArchivingService fileArchivingService,
            IImageEncodingResolver fileEncodingResolver,
            IFileService fileService,
            IImageService imageService,
            IPhotoResizeCalculator photoResizeCalculator)
        {
            _configuration = configuration;
            _fileArchivingService = fileArchivingService;
            _fileEncodingResolver = fileEncodingResolver;
            _fileService = fileService;
            _imageService = imageService;
            _photoResizeCalculator = photoResizeCalculator;
        }

        public string? GetEncodedImage(SKBitmap image, string fileName)
        {
            var encodedImageFormat = _fileEncodingResolver.GetEncodedImageFormatForFileName(fileName);
            if (encodedImageFormat is null)
                return null;

            try
            {
                using var skImage = SKImage.FromBitmap(image);
                using var encodedData = skImage.Encode(encodedImageFormat.Value, quality: 100);
                return Convert.ToBase64String(encodedData.ToArray());
            }
            catch 
            {
                return null;
            }
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

        public SKBitmap? MakeThumbnailFromEncodedFile(string encodedFile)
        {
            var imageFile = GetDecodedFile(encodedFile);
            if (imageFile is null)
                return null;

            return GetThumbnail(imageFile, targetDimensions: new PhotoDimensions(height: DefaultThumbnailDimensions.Height, width: DefaultThumbnailDimensions.Width));
        }

        public async Task<IEquipmentPhotoSavingResult> SaveEncodedFileAsync(IEquipmentPhotoSavingModel photo)
        {
            var result = new EquipmentPhotoSavingResult(_configuration, _fileService, photo);

            if (string.IsNullOrEmpty(photo.EncodedFile))
                return result with { Status = EquipmentPhotoSavingResultEnum.EmptyFile };

            var decodedFile = GetDecodedFile(photo.EncodedFile);
            if (decodedFile is null)
                return result with { Status = EquipmentPhotoSavingResultEnum.Error };

            if (decodedFile.Length == 0 || string.IsNullOrEmpty(photo.FileNameWithExtension))
                return result with { Status = EquipmentPhotoSavingResultEnum.EmptyFile };

            if (!Directory.Exists(result.DefaultPath))
            {
                Directory.CreateDirectory(result.DefaultPath);
            }

            var fileSavingResult = await _fileService.SaveAsync(decodedFile, result.FilePath, result.FileNameWithExtension);
            if (!fileSavingResult.Status.IsSuccess())
                return result with { Status = EquipmentPhotoSavingResultEnum.Error };

            var fileArchiveSavingResult = _fileArchivingService.Save(fileSavingResult, result.ZipPath);
            if (!fileArchiveSavingResult.Status.IsSuccess())
            {
                var fileDeletionResult = _fileService.Delete(result.FilePath);
                if (!fileDeletionResult.Status.IsSuccess())
                    throw new Exception($"Critical error! Unable to delete file {result.FilePath}");
            }

            return result with
            {
                RelativePath = fileArchiveSavingResult.RelativePath!,
                Status = EquipmentPhotoSavingResultEnum.Success,
            };
        }

        private byte[]? GetDecodedFile(string encodedFile)
        {
            try
            {
                return Convert.FromBase64String(encodedFile);
            }
            catch
            {
                return null;
            }
        }

        private SKBitmap? GetThumbnail(byte[] imageFile, IDimensionable targetDimensions)
        {
            using var imageMemoryStream = new MemoryStream(imageFile);
            if (imageMemoryStream is null)
                return null;

            using var skStream = new SKManagedStream(imageMemoryStream);
            var thumbnail = SKBitmap.Decode(skStream);

            if (thumbnail is null)
                return null;

            var resizingDimensions = _photoResizeCalculator.CalculateResizingDimensions(
                source: new PhotoDimensions(thumbnail.Height, thumbnail.Width),
                target: new PhotoDimensions(targetDimensions.Height, targetDimensions.Width));

            if (resizingDimensions is null)
                return null;

            return _imageService.GetResizedImage(thumbnail, resizingDimensions);
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

            result.FileArchiveLoadingResult = _fileArchivingService.Load(result.ZipPath, result.UnZipPath, result.FileNameWithExtension);
            if (!result.FileArchiveLoadingResult.Status.IsSuccess())
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            result.FileLoadingResult = await _fileService.LoadAsync(result.FileArchiveLoadingResult);
            if (!result.FileLoadingResult.Status.IsSuccess())
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            return result with { Status = EquipmentPhotoLoadingResultEnum.Success };
        }
    }
#pragma warning restore CA1822 // Mark members as static
}

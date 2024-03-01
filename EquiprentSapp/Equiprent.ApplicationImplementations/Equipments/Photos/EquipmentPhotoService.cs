using Equiprent.ApplicationImplementations.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Equipments.Photos;
using Equiprent.ApplicationInterfaces.Equipments.Photos.Models.Loading;
using Equiprent.ApplicationInterfaces.Files;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationImplementations.Equipments.Photos
{
    public class EquipmentPhotoService : IEquipmentPhotoService
    {
        private readonly IConfiguration _configuration;
        private readonly IFileArchivingService _fileArchivingService;
        private readonly IFileService _fileService;

        public EquipmentPhotoService(
            IConfiguration configuration,
            IFileArchivingService fileArchivingService,
            IFileService fileService)
        {
            _configuration = configuration;
            _fileArchivingService = fileArchivingService;
            _fileService = fileService;
        }

        public async Task<IEquipmentPhotoLoadingResult> LoadFileAsync(string photoRelativePath, string photoFileName)
        {
            var result = new EquipmentPhotoLoadingResult(_configuration, _fileService, photoRelativePath, photoFileName);

            if (!Directory.Exists(result.DefaultPath) ||
                !Directory.Exists(result.DirectoryPath) ||
                !File.Exists(result.ZipPath))
            {
                return result with { Status = EquipmentPhotoLoadingResultEnum.NotFound };
            }

            var archivedFileLoadingResult = _fileArchivingService.Load(result.ZipPath, result.UnZipPath, result.FileName);
            if (archivedFileLoadingResult.Status != FileArchiveLoadingResultEnum.Success)
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            var fileLoadingResult = await _fileService.LoadAsync(archivedFileLoadingResult);
            if (fileLoadingResult.Status != FileLoadingResultEnum.Success)
                return result with { Status = EquipmentPhotoLoadingResultEnum.Error };

            return result with
            {
                File = fileLoadingResult.File,
                Status = EquipmentPhotoLoadingResultEnum.Success,
            };
        }
    }
}

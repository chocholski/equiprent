using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;

namespace Equiprent.ApplicationInterfaces.Files
{
    public interface IFileService
    {
        string GetFileNameWithoutExtension(string fileName);
        Task<IFileLoadingResult> LoadAsync(IFileArchiveLoadingResult fileArchiveLoadingResult);
        Task<IFileSavingResult> SaveAsync(byte[] file, string filePath, string fileName);
    }
}

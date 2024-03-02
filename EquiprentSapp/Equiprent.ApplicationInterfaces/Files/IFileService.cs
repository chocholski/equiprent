using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;

namespace Equiprent.ApplicationInterfaces.Files
{
    public interface IFileService
    {
        public IFileDeletionResult Delete(string filePath);
        public IDirectoryDeletionResult DeleteDirectory(string directoryPath, bool recursive);
        public string GetFileNameWithoutExtension(string fileName);
        public Task<IFileLoadingResult> LoadAsync(string filePath);
        public Task<IFileLoadingResult> LoadAsync(IFileArchiveLoadingResult fileArchiveLoadingResult);
        public Task<IFileSavingResult> SaveAsync(byte[] file, string filePath, string fileName);
    }
}

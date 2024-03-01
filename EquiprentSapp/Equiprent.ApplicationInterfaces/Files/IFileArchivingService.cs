using Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading;
using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;
using Equiprent.ApplicationInterfaces.Files.Models.Files.Saving;

namespace Equiprent.ApplicationInterfaces.Files
{
    public interface IFileArchivingService
    {
        public IFileArchiveLoadingResult Load(string zipPath, string unZipDestinationPath, string fileName);
        public IFileArchiveSavingResult Save(IFileSavingResult fileSavingResult, string zipPath);
    }
}

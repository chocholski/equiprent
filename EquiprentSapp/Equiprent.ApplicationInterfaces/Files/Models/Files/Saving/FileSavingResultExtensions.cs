using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;

namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Saving
{
    public static class FileSavingResultExtensions
    {
        public static bool IsSuccess(this FileSavingResultEnum status) => status == FileSavingResultEnum.Success;

        public static FileArchiveSavingResultEnum ToFileArchiveSavingStatus(this FileSavingResultEnum status)
        {
            return status switch
            {
                FileSavingResultEnum.AlreadyExists => FileArchiveSavingResultEnum.AlreadyExists,
                FileSavingResultEnum.Error => FileArchiveSavingResultEnum.Error,
                FileSavingResultEnum.Success => FileArchiveSavingResultEnum.Success,
                _ => FileArchiveSavingResultEnum.Unknown,
            };
        }
    }
}

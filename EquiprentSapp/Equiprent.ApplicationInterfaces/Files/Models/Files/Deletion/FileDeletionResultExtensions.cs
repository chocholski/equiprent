using Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving;

namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion
{
    public static class FileDeletionResultExtensions
    {
        public static bool IsSuccess(this FileDeletionResultEnum status) => status == FileDeletionResultEnum.Success;

        public static FileArchiveSavingResultEnum ToFileArchiveSavingStatus(this FileDeletionResultEnum status)
        {
            return status switch
            {
                FileDeletionResultEnum.Error or
                FileDeletionResultEnum.NotFound => FileArchiveSavingResultEnum.Error,
                FileDeletionResultEnum.Success => FileArchiveSavingResultEnum.Success,
                _ => FileArchiveSavingResultEnum.Unknown,
            };
        }
    }
}

using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;

namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion
{
    public static class DirectoryDeletionResultExtensions
    {
        public static bool IsSuccess(this DirectoryDeletionResultEnum status) => status == DirectoryDeletionResultEnum.Success;

        public static FileLoadingResultEnum ToFileLoadingStatus(this DirectoryDeletionResultEnum status)
        {
            return status switch
            {
                DirectoryDeletionResultEnum.Error or
                DirectoryDeletionResultEnum.NotFound => FileLoadingResultEnum.Error,
                DirectoryDeletionResultEnum.Success => FileLoadingResultEnum.Success,
                _ => FileLoadingResultEnum.Unknown,
            };
        }
    }
}

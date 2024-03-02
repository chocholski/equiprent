using Equiprent.ApplicationInterfaces.Files.Models.Files.Loading;

namespace Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading
{
    public static class FileArchiveLoadingResultExtensions
    {
        public static bool IsSuccess(this FileArchiveLoadingResultEnum status) => status == FileArchiveLoadingResultEnum.Success;

        public static FileLoadingResultEnum ToFileLoadingResultStatus(this FileArchiveLoadingResultEnum status)
        {
            return status switch
            {
                FileArchiveLoadingResultEnum.Error => FileLoadingResultEnum.Error,
                FileArchiveLoadingResultEnum.NotFound => FileLoadingResultEnum.NotFound,
                FileArchiveLoadingResultEnum.Success => FileLoadingResultEnum.Success,
                _ => FileLoadingResultEnum.Unknown,
            };
        }
    }
}

namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Loading
{
    public static class FileLoadingResultExtensions
    {
        public static bool IsSuccess(this FileLoadingResultEnum status) => status == FileLoadingResultEnum.Success;
    }
}

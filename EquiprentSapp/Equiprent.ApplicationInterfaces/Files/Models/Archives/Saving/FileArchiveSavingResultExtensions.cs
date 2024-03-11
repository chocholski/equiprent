namespace Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving
{
    public static class FileArchiveSavingResultExtensions
    {
        public static bool IsSuccess(this FileArchiveSavingResultEnum status) => status == FileArchiveSavingResultEnum.Success;
    }
}

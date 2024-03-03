namespace Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving
{
    public interface IFileArchiveSavingResult
    {
        string FileName { get; }

        string FilePath { get; }

        string? RelativePath { get; }

        FileArchiveSavingResultEnum Status { get; set; }

        public string ZipPath { get; }
    }
}

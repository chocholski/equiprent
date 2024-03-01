namespace Equiprent.ApplicationInterfaces.Files.Models.Archives.Saving
{
    public interface IFileArchiveSavingResult
    {
        string FileName { get; set; }

        string FilePath { get; set; }

        string? RelativePath { get; }

        FileArchiveSavingResultEnum Status { get; set; }

        public string ZipPath { get; set; }
    }
}

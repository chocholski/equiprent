namespace Equiprent.ApplicationInterfaces.Files.Models.Archives.Loading
{
    public interface IFileArchiveLoadingResult
    {
        public string FileName { get; }

        public string? FilePath { get; }

        public FileArchiveLoadingResultEnum Status { get; set; }

        public string UnZipDestinationPath { get; }

        public string ZipPath { get; }
    }
}

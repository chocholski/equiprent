namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Saving
{
    public interface IFileSavingResult
    {
        public string FileName { get; }

        public string FilePath { get; }

        public FileSavingResultEnum Status { get; set; }
    }
}

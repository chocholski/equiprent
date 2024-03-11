namespace Equiprent.Entities.Abstractions
{
    public abstract class FileBase
    {
        public required string FileName { get; set; }

        public required string RelativePath { get; set; }
    }
}

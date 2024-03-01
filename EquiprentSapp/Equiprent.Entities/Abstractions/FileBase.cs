namespace Equiprent.Entities.Abstractions
{
    public abstract class FileBase
    {
        public string FileName { get; set; } = null!;

        public string RelativePath { get; set; } = null!;
    }
}

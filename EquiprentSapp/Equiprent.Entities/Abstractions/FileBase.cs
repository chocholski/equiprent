namespace Equiprent.Entities.Abstractions
{
    public abstract class FileBase
    {
        [Required]
        public string FileName { get; set; } = null!;

        [Required]
        public string RelativePath { get; set; } = null!;
    }
}

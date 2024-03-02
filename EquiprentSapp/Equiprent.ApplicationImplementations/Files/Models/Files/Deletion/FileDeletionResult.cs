using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Deletion
{
    public record FileDeletionResult : IFileDeletionResult
    {
        public FileDeletionResultEnum Status { get; set; } = FileDeletionResultEnum.Unknown;
    }
}

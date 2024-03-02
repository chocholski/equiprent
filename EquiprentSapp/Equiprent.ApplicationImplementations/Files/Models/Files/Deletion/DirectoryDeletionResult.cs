using Equiprent.ApplicationInterfaces.Files.Models.Files.Deletion;

namespace Equiprent.ApplicationImplementations.Files.Models.Files.Deletion
{
    public record DirectoryDeletionResult : IDirectoryDeletionResult
    {
        public DirectoryDeletionResultEnum Status { get; set; } = DirectoryDeletionResultEnum.Unknown;
    }
}

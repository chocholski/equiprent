using Microsoft.Extensions.Configuration;

namespace Equiprent.ApplicationInterfaces.Files.Models
{
    public abstract record FileResultBase
    {
        private readonly string _mainFolderPath;

        public FileResultBase(IConfiguration configuration)
        {
            var mainFileFolderPath = configuration["Paths:MainFileFolder"];
            if (string.IsNullOrEmpty(mainFileFolderPath))
                throw new Exception("Invalid configuration!");

            _mainFolderPath = mainFileFolderPath;
        }

        protected bool DoesPathContainMainFileFolderPath(string? filePath) => filePath?.Contains(_mainFolderPath) ?? false;

        protected string? GetPathWithoutMainFileFolderPath(string? filePath) => filePath?.Replace(_mainFolderPath, string.Empty);
    }
}

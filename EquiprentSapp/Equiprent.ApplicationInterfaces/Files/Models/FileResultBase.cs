﻿using Equiprent.Extensions;
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
                throw new MissingEntryInConfigurationException("Main File Folder Path");

            _mainFolderPath = mainFileFolderPath;
        }

        protected string? GetPathWithoutMainFileFolderPath(string? filePath)
        {
            var filePathWithoutMainFolder = filePath?.Replace(_mainFolderPath, string.Empty);
            if (filePathWithoutMainFolder is not null &&
                (
                    filePathWithoutMainFolder.StartsWith("\\") ||
                    filePathWithoutMainFolder.StartsWith("/")
                ))
            {
                return filePathWithoutMainFolder.Remove(startIndex: 0, count: 1);
            }

            return filePathWithoutMainFolder;
        }
    }
}

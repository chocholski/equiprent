﻿namespace Equiprent.ApplicationInterfaces.Files.Models.Files.Loading
{
    public interface IFileLoadingResult
    {
        public byte[]? File { get; set; }

        public string FilePath { get; }

        public FileLoadingResultEnum Status { get; set; }
    }
}

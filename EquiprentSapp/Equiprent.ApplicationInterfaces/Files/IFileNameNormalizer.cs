namespace Equiprent.ApplicationInterfaces.Files
{
    public interface IFileNameNormalizer
    {
        public string Normalize(string fileName, bool withExtension);
    }
}

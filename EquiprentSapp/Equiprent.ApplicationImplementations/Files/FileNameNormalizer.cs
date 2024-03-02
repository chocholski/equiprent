using Equiprent.ApplicationInterfaces.Files;
using System.Globalization;
using System.Text;

namespace Equiprent.ApplicationImplementations.Files
{
    public class FileNameNormalizer : IFileNameNormalizer
    {
        public string Normalize(string fileName, bool withExtension)
        {
            var normalizedFileName = fileName[..fileName.LastIndexOf('.')]
                .Normalize(NormalizationForm.FormD)
                .Where(c => char.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .Select(c => FileNameLetterTranslator.TranslateWithStandardProcessing(c, ProcessLetterConventionally));

            return $"{new string(normalizedFileName.ToArray()).Replace(" ", string.Empty)}{(withExtension ? $".{Path.GetExtension(fileName)}" : string.Empty)}";
        }

        private static char ProcessLetterConventionally(char c) => char.IsLetterOrDigit(c) ? c : ' ';
    }
}

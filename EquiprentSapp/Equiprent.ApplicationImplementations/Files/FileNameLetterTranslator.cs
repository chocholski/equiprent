namespace Equiprent.ApplicationImplementations.Files
{
    public class FileNameLetterTranslator
    {
        private static readonly Dictionary<char, char> _translationMap = new()
            {
                {'Ł', 'L'}, {'ł', 'l'},
                {'Ą', 'A'}, {'ą', 'a'},
                {'Ć', 'C'}, {'ć', 'c'},
                {'Ń', 'N'}, {'ń', 'n'},
                {'Ó', 'O'}, {'ó', 'o'},
                {'Ś', 'S'}, {'ś', 's'},
                {'Ę', 'E'}, {'ę', 'e'},
                {'Ż', 'Z'}, {'ż', 'z'},
                {'Ź', 'Z'}, {'ź', 'z'}
            };

        public static char TranslateWithStandardProcessing(char letter, Func<char, char> processConventionallyInitializer)
        {
            return _translationMap.TryGetValue(letter, out var translatedLetter)
                ? translatedLetter
                : processConventionallyInitializer.Invoke(letter);
        }
    }
}

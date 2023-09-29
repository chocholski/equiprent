using System.Linq;
using System.Text;

namespace Equiprent.Extensions
{
    public static class StringBuilderExtensions
    {
        public static StringBuilder RemoveFromEnd(this StringBuilder stringBuilder, string removeSuffix)
        {
            if (stringBuilder.Length < removeSuffix.Length)
                return stringBuilder;

            var endsWithSuffix = true;

            foreach (var (character, index) in removeSuffix.Select((character, index) => (character, index)))
            {
                if (stringBuilder[stringBuilder.Length - removeSuffix.Length + index] != removeSuffix[index])
                {
                    endsWithSuffix = false;

                    break;
                }
            }

            if (endsWithSuffix)
                stringBuilder.Remove(stringBuilder.Length - removeSuffix.Length, removeSuffix.Length);

            return stringBuilder;
        }
    }
}

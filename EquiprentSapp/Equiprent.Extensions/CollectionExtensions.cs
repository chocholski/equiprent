using System.Collections.Generic;
using System.Linq;

namespace Equiprent.Extensions
{
    public static class CollectionExtensions
    {
        public static List<T>? AppendRange<T>(this List<T>? collection, IEnumerable<T> otherCollection)
        {
            collection?.AddRange(otherCollection);

            return collection;
        }

        public static bool IsNullOrEmpty<T>(this IEnumerable<T>? collection) => collection is null || !collection.Any();
    }
}

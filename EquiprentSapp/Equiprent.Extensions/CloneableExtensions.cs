using Equiprent.Entities.Attributes;
using System;

namespace Equiprent.Extensions
{
    public static class CloneableExtensions
    {
        public static T Clone<T>(this Entities.Interfaces.ICloneable<T> source)
            where T : new()
        {
            var clonedObject = new T();
            var properties = typeof(T).GetProperties();

            foreach (var property in properties)
            {
                if (Attribute.IsDefined(property, typeof(CloneablePropertyAttribute)))
                {
                    property.SetValue(clonedObject, property.GetValue(source));
                }
            }

            return clonedObject;
        }
    }
}

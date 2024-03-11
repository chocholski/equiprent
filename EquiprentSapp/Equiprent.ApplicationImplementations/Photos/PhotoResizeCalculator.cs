using Equiprent.ApplicationImplementations.Photos.Resizing;
using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Photos;
using Equiprent.ApplicationInterfaces.Photos.Resizing;

namespace Equiprent.ApplicationImplementations.Photos
{
    public class PhotoResizeCalculator : IPhotoResizeCalculator
    {
        private static readonly float _defaultResizeFactor = 1.0f;

        public IResizingDimensions? CalculateResizingDimensions(IDimensionable source, IDimensionable target)
        {
            var resizeWidthFactor = CalculateFactor(source.Width, target.Width);
            var resizeHeightFactor = CalculateFactor(source.Height, target.Height);

            float? overallResizeFactor;
            try
            {
                overallResizeFactor = Convert.ToSingle(Math.Max(resizeWidthFactor, resizeHeightFactor));
            }
            catch { return null; }

            if (overallResizeFactor is null or <= 0)
                return null;

            return new ResizingDimensions
            {
                Height = CalculateResizeDimension(source.Height, overallResizeFactor.Value),
                ResizingFactor = overallResizeFactor.Value,
                Width = CalculateResizeDimension(source.Width, overallResizeFactor.Value)
            };
        }

        private static float CalculateFactor(float sourceValue, float targetValue) =>
            sourceValue > targetValue ? sourceValue / targetValue : _defaultResizeFactor;

        private static float CalculateResizeDimension(float dimension, float resizeFactor)
        {
            try
            {
                return Convert.ToSingle(Math.Floor(dimension / resizeFactor));
            }
            catch { return dimension; }
        }
    }
}

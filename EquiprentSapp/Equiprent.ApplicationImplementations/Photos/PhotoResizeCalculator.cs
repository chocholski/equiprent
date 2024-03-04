using Equiprent.ApplicationImplementations.Photos.Resizing;
using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Photos;
using Equiprent.ApplicationInterfaces.Photos.Resizing;

namespace Equiprent.ApplicationImplementations.Photos
{
    public class PhotoResizeCalculator : IPhotoResizeCalculator
    {
        private static readonly double _defaultResizeFactor = 1.0;

        public IResizingDimensions? CalculateResizingDimensions(IDimensionable source, IDimensionable target)
        {
            var resizeWidthFactor = CalculateFactor(source.Width, target.Width);
            var resizeHeightFactor = CalculateFactor(source.Height, target.Height);
            var overallResizeFactor = Math.Max(resizeWidthFactor, resizeHeightFactor);

            if (overallResizeFactor <= 0)
                return null;

            return new ResizingDimensions
            {
                Height = CalculateResizeDimension(source.Height, overallResizeFactor),
                Width = CalculateResizeDimension(source.Width, overallResizeFactor)
            };
        }

        private static double CalculateFactor(double sourceValue, double targetValue) =>
            sourceValue > targetValue ? sourceValue / targetValue : _defaultResizeFactor;

        private static double CalculateResizeDimension(double dimension, double resizeFactor) => Math.Floor(dimension / resizeFactor);
    }
}

using Equiprent.ApplicationInterfaces.Abstractions;
using Equiprent.ApplicationInterfaces.Photos.Resizing;

namespace Equiprent.ApplicationInterfaces.Photos
{
    public interface IPhotoResizeCalculator
    {
        public IResizingDimensions? CalculateResizingDimensions(IDimensionable source, IDimensionable target);
    }
}

using Equiprent.ApplicationInterfaces.Photos.Resizing;

namespace Equiprent.ApplicationImplementations.Photos.Resizing
{
    public record ResizingDimensions : IResizingDimensions
    {
        public required double Height { get; set; }
        public required double Width { get; set; }
    }
}

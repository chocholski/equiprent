using Equiprent.ApplicationInterfaces.Photos.Resizing;

namespace Equiprent.ApplicationImplementations.Photos.Resizing
{
    public record ResizingDimensions : IResizingDimensions
    {

        public required float Height { get; set; }

        public required float ResizingFactor { get; set; }

        public required float Width { get; set; }
    }
}

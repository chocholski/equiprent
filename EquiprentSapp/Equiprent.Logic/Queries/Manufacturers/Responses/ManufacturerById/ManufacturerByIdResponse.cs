using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.ManufacturerById
{
    public record ManufacturerByIdResponse
    {
        public ManufacturerAddressModel Address { get; set; } = null!;
        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsOperational { get; set; }
        public string Name { get; set; } = null!;
    }
}

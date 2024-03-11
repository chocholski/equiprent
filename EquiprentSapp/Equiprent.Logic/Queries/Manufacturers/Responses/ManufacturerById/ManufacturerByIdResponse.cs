using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Queries.Manufacturers.Responses.ManufacturerById
{
    public record ManufacturerByIdResponse
    {
        public required ManufacturerAddressModel Address { get; set; }
        public required Guid Id { get; set; }
        public required bool IsDeleted { get; set; }
        public required bool IsOperational { get; set; }
        public required string Name { get; set; }
    }
}

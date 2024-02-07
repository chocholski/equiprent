using Equiprent.Logic.Queries.Manufacturers.Responses.ManufacturerById;
using MediatR;

namespace Equiprent.Logic.Queries.Manufacturers.Requests
{
    public class GetManufacturerByIdRequest : IRequest<ManufacturerByIdResponse?>
    {
        public Guid Id { get; set; }

        public GetManufacturerByIdRequest(Guid manufacturerId) => Id = manufacturerId;
    }
}

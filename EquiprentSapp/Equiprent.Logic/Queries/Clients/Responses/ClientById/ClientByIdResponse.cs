using Equiprent.Logic.GeneralModels;
using System.Diagnostics.CodeAnalysis;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById
{
    public class ClientByIdResponse
    {
        public List<ClientAddressModel> Addresses { get; set; } = new();
        public string? FirstName { get; set; }
        public required Guid Id { get; set; }
        public string? LastName { get; set; }
        public required string Name { get; set; } = null!;
        public required int TypeId { get; set; }
    }
}

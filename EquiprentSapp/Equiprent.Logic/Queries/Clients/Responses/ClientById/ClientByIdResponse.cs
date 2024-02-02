using Equiprent.Logic.GeneralModels;

namespace Equiprent.Logic.Queries.Clients.Responses.ClientById
{
    public class ClientByIdResponse
    {
        public List<ClientAddressModel> Addresses { get; set; } = new();
        public string? FirstName { get; set; }
        public Guid Id { get; set; }
        public string? LastName { get; set; }
        public string Name { get; set; } = null!;
        public int TypeId { get; set; }
    }
}

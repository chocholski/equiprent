using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.Create
{
    public class CreateRequest : IRequest<CommandResult?>
    { 
        public List<ClientAddressModel> Addresses { get; set; } = null!;
        public int TypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string Name { get; set; } = null!;
    }
}

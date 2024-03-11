using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.Create
{
    public partial class CreateRequest : IRequest<CommandResult?>
    { 
        public required List<ClientAddressModel> Addresses { get; set; }
        public required int TypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public required string Name { get; set; }
    }
}

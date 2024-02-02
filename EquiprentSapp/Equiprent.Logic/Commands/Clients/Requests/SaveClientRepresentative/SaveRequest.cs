using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Logic.GeneralModels;
using MediatR;

namespace Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative
{
    public class SaveRequest : IRequest<CommandResult?>
    {
        public AddressModel Address { get; set; } = null!;
        public Guid ClientId { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public string LastName { get; set; } = null!;
    }
}

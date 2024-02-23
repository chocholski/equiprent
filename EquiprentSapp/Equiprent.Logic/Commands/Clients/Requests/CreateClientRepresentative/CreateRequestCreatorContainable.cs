using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative
{
    public partial class CreateRequest : ICreatorContainable
    {
        public Guid CreatedById { get; set; }
    }
}

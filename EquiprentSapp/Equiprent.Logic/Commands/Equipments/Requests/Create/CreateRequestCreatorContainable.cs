using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Equipments.Requests.Create
{
    public partial class CreateRequest : ICreatorContainable
    {
        public Guid CreatedById { get; set; }
    }
}

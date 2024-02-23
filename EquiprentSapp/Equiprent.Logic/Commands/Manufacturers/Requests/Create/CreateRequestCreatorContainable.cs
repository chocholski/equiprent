using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Manufacturers.Requests.Create
{
    public partial class CreateRequest : ICreatorContainable
    {
        public Guid CreatedById { get; set; }
    }
}

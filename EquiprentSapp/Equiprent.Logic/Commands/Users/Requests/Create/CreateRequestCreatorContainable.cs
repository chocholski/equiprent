using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public partial record CreateRequest : ICreatorContainable
    {
        public Guid CreatedById { get; set; }
    }
}

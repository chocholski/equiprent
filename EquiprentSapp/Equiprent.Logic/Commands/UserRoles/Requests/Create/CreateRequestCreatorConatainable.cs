using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public partial record CreateRequest : ICreatorContainable
    {
        public Guid CreatedById { get; set; }
    }
}

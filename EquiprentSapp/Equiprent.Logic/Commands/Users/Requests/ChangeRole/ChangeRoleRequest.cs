using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeRole
{
    public record ChangeRoleRequest : ICommand
    {
        public Guid UserId { get; set; }
        public int UserRoleId { get; set; }
    }
}

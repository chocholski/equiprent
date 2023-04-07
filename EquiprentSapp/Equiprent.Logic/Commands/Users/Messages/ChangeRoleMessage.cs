using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class ChangeRoleMessage : ICommand
    {
        public Guid UserId { get; set; }
        public int UserRoleId { get; set; }
    }
}

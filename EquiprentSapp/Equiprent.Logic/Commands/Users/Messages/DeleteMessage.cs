using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class DeleteMessage : ICommand
    {
        public Guid Id { get; set; }
    }
}

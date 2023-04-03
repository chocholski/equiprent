using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class DeleteMessage : ICommand
    {
        public int Id { get; set; }
    }
}

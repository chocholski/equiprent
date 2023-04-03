using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Messages
{
    public class DeleteMessage : ICommand
    {
        public int Id { get; set; }

        public DeleteMessage(int id) => Id = id;
    }
}

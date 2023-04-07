using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class ChangeLanguageMessage : ICommand
    {
        public Guid Id { get; set; }
        public int LanguageId { get; set; }
    }
}

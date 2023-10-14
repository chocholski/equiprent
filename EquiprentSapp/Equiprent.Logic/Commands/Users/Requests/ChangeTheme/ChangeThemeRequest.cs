using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeTheme
{
    public class ChangeThemeRequest : ICommand
    {
        public Guid Id { get; set; }
    }
}

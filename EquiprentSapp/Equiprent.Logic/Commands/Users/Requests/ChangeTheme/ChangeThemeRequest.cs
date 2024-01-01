using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeTheme
{
    public class ChangeThemeRequest : IRequest<CommandResult>
    {
        public Guid Id { get; set; }
    }
}

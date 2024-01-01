using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeLanguage
{
    public record ChangeLanguageRequest : IRequest<CommandResult>
    {
        public Guid Id { get; set; }
        public int LanguageId { get; set; }
    }
}

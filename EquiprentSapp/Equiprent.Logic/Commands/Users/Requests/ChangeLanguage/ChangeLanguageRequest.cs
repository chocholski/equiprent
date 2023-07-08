using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeLanguage
{
    public record ChangeLanguageRequest(Guid Id, int LanguageId) : ICommand;
}

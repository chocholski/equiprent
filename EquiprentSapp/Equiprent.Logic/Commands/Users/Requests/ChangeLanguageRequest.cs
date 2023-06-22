using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record ChangeLanguageRequest(Guid Id, int LanguageId) : ICommand;
}

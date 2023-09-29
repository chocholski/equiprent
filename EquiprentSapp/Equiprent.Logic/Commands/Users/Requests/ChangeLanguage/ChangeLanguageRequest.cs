using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeLanguage
{
    public record ChangeLanguageRequest : ICommand
    {
        public Guid Id { get; set; }
        public int LanguageId { get; set; }
    }
}

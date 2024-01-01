using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Abstractions
{
    public abstract record NameInLanguagesBaseResponse : IRequest<CommandResult>
    {
        public List<NameInLanguage> NameInLanguages { get; set; } = new();
    }

    public record NameInLanguage(string Name, int LanguageId, string? LanguageName);
}

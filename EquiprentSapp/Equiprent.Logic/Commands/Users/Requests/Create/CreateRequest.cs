using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public record CreateRequest(
        string Login,
        string FirstName,
        string LastName,
        string? Email,
        int UserRoleId,
        bool IsActive,
        int LanguageId,
        string Password) : ICommand;
}

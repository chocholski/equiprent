using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public record SaveRequest(
        Guid Id,
        string Login,
        string? Password,
        string FirstName,
        string LastName,
        string? Email,
        int UserRoleId,
        bool IsActive,
        bool IsDeleted) : ICommand;
}

using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record CreateRequest(
        string Login,
        string FirstName,
        string LastName,
        string? Email,
        int UserRoleId,
        int DepartmentId,
        int PositionId,
        int? ManagerId,
        int CalendarTypeAssignedId,
        bool IsActive,
        int LanguageId,
        string Password) : ICommand;
}

using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public record SaveRequest(
        Guid Id,
        string Login,
        string? Password,
        string FirstName,
        string LastName,
        string? Email,
        int UserRoleId,
        int DepartmentId,
        int PositionId,
        int? ManagerId,
        int CaslendarTypeAssignedId,
        bool IsActive,
        bool IsDeleted) : ICommand;
}

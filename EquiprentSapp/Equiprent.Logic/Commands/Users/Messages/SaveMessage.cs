using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Messages
{
    public class SaveMessage : ICommand
    {
        public Guid Id { get; set; }
        public string Login { get; set; } = null!;
        public string? Password { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Email { get; set; }
        public int UserRoleId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int? ManagerId { get; set; }
        public int CalendarTypeAssignedId { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}

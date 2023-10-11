using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public record SaveRequest : ICommand
    {
        public string? Email { get; set; }
        public string FirstName { get; set; } = null!;
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
        public string LastName { get; set; } = null!;
        public string? Password { get; set; }
        public int? UserRoleId { get; set; }
    }
}

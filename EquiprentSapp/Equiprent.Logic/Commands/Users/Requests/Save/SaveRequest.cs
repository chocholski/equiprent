using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public record SaveRequest : IRequest<CommandResult>
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

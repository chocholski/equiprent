using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.Save
{
    public record SaveRequest : IRequest<CommandResult>
    {
        public string? Email { get; set; }
        public required string FirstName { get; set; }
        public required Guid Id { get; set; }
        public required bool IsActive { get; set; }
        public required string LastName { get; set; }
        public string? Password { get; set; }
        public int? UserRoleId { get; set; }
    }
}

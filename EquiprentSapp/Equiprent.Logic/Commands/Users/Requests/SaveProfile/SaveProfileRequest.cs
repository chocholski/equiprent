using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.SaveProfile
{
    public class SaveProfileRequest : IRequest<CommandResult>
    {
        public string? Email { get; set; }
        public required string FirstName { get; set; } = null!;
        public required Guid Id { get; set; }
        public required string LastName { get; set; } = null!;
        public string? Password { get; set; }
    }
}

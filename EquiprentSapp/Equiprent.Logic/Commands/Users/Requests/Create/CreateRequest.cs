using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public partial record CreateRequest : IRequest<CommandResult>
    {
        public string? Email { get; set; }
        public required string FirstName { get; set; }
        public required bool IsActive { get; set; }
        public int? LanguageId { get; set; }
        public required string LastName { get; set; }
        public required string Login { get; set; }
        public required string Password { get; set; }
        public int? UserRoleId { get; set; }
    }
}

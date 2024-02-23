using Equiprent.ApplicationInterfaces.CommandResults;
using MediatR;

namespace Equiprent.Logic.Commands.Users.Requests.Create
{
    public partial record CreateRequest : IRequest<CommandResult>
    {
        public string? Email { get; set; }
        public string FirstName { get; set; } = null!;
        public bool IsActive { get; set; }
        public int? LanguageId { get; set; }
        public string LastName { get; set; } = null!;
        public string Login { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int? UserRoleId { get; set; }
    }
}

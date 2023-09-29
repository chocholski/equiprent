using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Requests.ChangePassword
{
    public record ChangePasswordRequest : ICommand
    {
        public Guid Id { get; set; }
        public string OldPassword { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}

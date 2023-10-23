using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Save
{
    public record SaveRequest : NameInLanguagesBaseResponse, ICommand
    {
        public int Id { get; set; }
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}

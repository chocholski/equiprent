using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public record CreateRequest : NameInLanguagesBaseResponse
    {
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}

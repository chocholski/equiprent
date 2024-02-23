using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public partial record CreateRequest : NameInLanguagesBaseResponse
    {
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}

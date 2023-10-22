using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record UserRoleByIdResponse : NameInLanguagesBaseResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<UserRolePermissionsListGroupItemModel> Permissions { get; set; } = new();
        public List<UserRolePermissionListItemModel> PermissionsSelected { get; set; } = new();
    }
}

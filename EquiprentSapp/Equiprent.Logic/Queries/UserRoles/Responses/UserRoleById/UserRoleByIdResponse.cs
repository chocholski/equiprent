using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record UserRoleByIdResponse : NameInLanguagesBaseResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<PermissionGroupItemModel> GroupedPermissions { get; set; } = new();
        public List<PermissionItemModel> PermissionsSelected { get; set; } = new();
    }
}

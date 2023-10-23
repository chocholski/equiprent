namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation
{
    public class PermissionGroupModel
    {
        public string Name { get; set; } = null!;
        public List<PermissionItemModel> Permissions { get; set; } = new();
    }
}

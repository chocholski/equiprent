namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation
{
    public class UserRolePermissionForCreationListItemModel
    {
        public int UserPermissionId { get; set; }
        public string SystemName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool IsSelected { get; set; }
        public List<int> LinkedUserPermissions { get; set; } = new();
    }
}

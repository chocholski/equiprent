namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record UserRolePermissionListItemModel
    {
        public bool IsSelected { get; set; }
        public List<int> LinkedUserPermissions { get; set; } = new();
        public string Name { get; set; } = null!;
        public string SystemName { get; set; } = null!;
        public int UserPermissionId { get; set; }
    }
}

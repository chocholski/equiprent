namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation
{
    public class PermissionItemModel
    {
        public int Id { get; set; }
        public string SystemName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool IsSelected { get; set; }
        public List<int> LinkedPermissionsIds { get; set; } = new();
    }
}

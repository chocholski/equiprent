namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation
{
    public class PermissionItemModel
    {
        public required int Id { get; set; }
        public required string SystemName { get; set; }
        public required string Name { get; set; }
        public required bool IsSelected { get; set; }
        public List<int> LinkedPermissionsIds { get; set; } = new();
    }
}

namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record PermissionItemModel
    {
        public required int Id { get; set; }
        public required bool IsSelected { get; set; }
        public List<int> LinkedPermissionsIds { get; set; } = new();
        public required string Name { get; set; }
        public required string SystemName { get; set; }
    }
}

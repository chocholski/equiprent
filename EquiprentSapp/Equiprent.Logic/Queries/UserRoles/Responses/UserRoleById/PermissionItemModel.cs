namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record PermissionItemModel
    {
        public int Id { get; set; }
        public bool IsSelected { get; set; }
        public List<int> LinkedPermissionsIds { get; set; } = new();
        public string Name { get; set; } = null!;
        public string SystemName { get; set; } = null!;
    }
}

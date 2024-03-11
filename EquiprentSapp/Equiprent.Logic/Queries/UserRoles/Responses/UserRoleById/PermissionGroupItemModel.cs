namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record PermissionGroupItemModel
    {
        public required string Name { get; set; }
        public List<PermissionItemModel> Permissions { get; set; } = new();
    }
}

namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record PermissionGroupItemModel
    {
        public string Name { get; set; } = null!;
        public List<PermissionItemModel> Permissions { get; set; } = new();
    }
}

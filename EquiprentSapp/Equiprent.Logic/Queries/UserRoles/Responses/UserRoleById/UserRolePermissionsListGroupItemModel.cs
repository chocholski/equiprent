namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById
{
    public record UserRolePermissionsListGroupItemModel
    {
        public string GroupName { get; set; } = null!;
        public List<UserRolePermissionListItemModel> Permissions { get; set; } = new();
    }
}

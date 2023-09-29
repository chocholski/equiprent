namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public record UserRolePermissionsListItemModel
    {
        public int UserPermissionId { get; set; }
        public bool IsSelected { get; set; }
    }
}

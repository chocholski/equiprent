namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public record UserRolePermissionsListItemModel
    {
        public int Id { get; set; }
        public bool IsSelected { get; set; }
    }
}

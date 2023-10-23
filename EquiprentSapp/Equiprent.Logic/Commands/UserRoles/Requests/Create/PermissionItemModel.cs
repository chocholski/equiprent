namespace Equiprent.Logic.Commands.UserRoles.Requests.Create
{
    public record PermissionItemModel
    {
        public int Id { get; set; }
        public bool IsSelected { get; set; }
    }
}

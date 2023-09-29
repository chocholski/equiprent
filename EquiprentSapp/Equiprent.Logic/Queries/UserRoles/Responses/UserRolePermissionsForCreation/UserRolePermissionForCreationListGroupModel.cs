namespace Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation
{
    public class UserRolePermissionForCreationListGroupModel
    {
        public string GroupName { get; set; } = null!;
        public List<UserRolePermissionForCreationListItemModel> Permissions { get; set; } = new();
    }
}

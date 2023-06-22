namespace Equiprent.Logic.Queries.UserRoles.Models
{
    public class UserPermissionsForUserRoleCreationResponse
    {
        public List<UserPermissionForUserRoleCreationListGroupModel> List { get; set; }

        public UserPermissionsForUserRoleCreationResponse() => List = new List<UserPermissionForUserRoleCreationListGroupModel>();
    }

    public class UserPermissionForUserRoleCreationListGroupModel
    {
        public string GroupName { get; set; } = null!;
        public List<UserPermissionForUserRoleCreationListItemModel> Permissions { get; set; }

        public UserPermissionForUserRoleCreationListGroupModel() => Permissions = new List<UserPermissionForUserRoleCreationListItemModel>();
    }

    public class UserPermissionForUserRoleCreationListItemModel
    {
        public int UserPermissionId { get; set; }
        public string SystemName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool IsSelected { get; set; }
        public List<int> LinkedUserPermissions { get; set; }

        public UserPermissionForUserRoleCreationListItemModel() => LinkedUserPermissions = new List<int>();
    }
}

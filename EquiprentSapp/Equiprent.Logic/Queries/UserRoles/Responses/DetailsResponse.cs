using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.UserRoles.Models
{
    public record DetailsResponse : NameInLanguagesBase
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public List<UserPermissionsForUserRoleListGroupItemModel> UserPermissionsForUserRoleList { get; set; }

        public DetailsResponse()
        {
            UserPermissionsForUserRoleList = new List<UserPermissionsForUserRoleListGroupItemModel>();
        }
    }

    public record UserPermissionsForUserRoleListGroupItemModel
    {
        public string GroupName { get; set; } = null!;
        public List<UserPermissionForUserRoleListItemModel> Permissions { get; set; }

        public UserPermissionsForUserRoleListGroupItemModel()
        {
            Permissions = new List<UserPermissionForUserRoleListItemModel>();
        }
    }

    public record UserPermissionForUserRoleListItemModel
    {
        public int UserPermissionId { get; set; }
        public string SystemName { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool IsSelected { get; set; }
        public List<int> LinkedUserPermissions { get; set; }

        public UserPermissionForUserRoleListItemModel() => LinkedUserPermissions = new List<int>();
    }
}

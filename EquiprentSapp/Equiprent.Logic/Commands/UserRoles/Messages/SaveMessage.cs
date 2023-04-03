using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Messages
{
    public class SaveMessage : NameInLanguagesBase, ICommand
    {
        public int Id { get; set; }
        public List<UserPermissionsForUserRoleListItemModel> UserPermissionsForUserRoleList { get; set; }

        public SaveMessage()
        {
            UserPermissionsForUserRoleList = new List<UserPermissionsForUserRoleListItemModel>();
        }
    }

    public class UserPermissionsForUserRoleListItemModel
    {
        public int UserPermissionId { get; set; }
        public bool IsSelected { get; set; }
    }
}

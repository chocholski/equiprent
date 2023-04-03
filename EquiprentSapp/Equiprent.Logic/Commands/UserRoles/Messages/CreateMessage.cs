using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Messages
{
    public class CreateMessage : NameInLanguagesBase, ICommand
    {
        public List<UserPermissionsForUserRoleListItemModel> UserPermissionsForUserRoleList { get; set; }

        public CreateMessage()
        {
            UserPermissionsForUserRoleList = new List<UserPermissionsForUserRoleListItemModel>();
        }

        public class UserPermissionsForUserRoleListItemModel
        {
            public int UserPermissionId { get; set; }
            public bool IsSelected { get; set; }
        }
    }
}

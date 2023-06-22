using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Messages
{
    public record SaveRequest : NameInLanguagesBase, ICommand
    {
        public int Id { get; set; }
        public List<UserPermissionsForUserRoleListItemModel> UserPermissionsForUserRoleList { get; set; } = new List<UserPermissionsForUserRoleListItemModel>();
    }

    public record UserPermissionsForUserRoleListItemModel(int UserPermissionId, bool IsSelected);
}

using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Messages
{
    public record GetUserPermissionsForUserRoleCreationMessage : IQuery<UserPermissionsForUserRoleCreationModel>
    { 
        public GetUserPermissionsForUserRoleCreationMessage()
        {
        }
    }
}

using Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetUserRolePermissionsForCreationRequest : IQuery<UserRolePermissionsForCreationResponse>
    { 
        public GetUserRolePermissionsForCreationRequest()
        {
        }
    }
}

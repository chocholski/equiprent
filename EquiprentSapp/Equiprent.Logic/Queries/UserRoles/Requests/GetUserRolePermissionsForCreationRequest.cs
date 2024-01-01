using Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation;
using MediatR;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetUserRolePermissionsForCreationRequest : IRequest<UserRolePermissionsForCreationResponse?>
    { 
        public GetUserRolePermissionsForCreationRequest()
        {
        }
    }
}

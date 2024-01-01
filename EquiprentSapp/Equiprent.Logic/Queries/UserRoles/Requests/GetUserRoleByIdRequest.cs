using Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById;
using MediatR;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetUserRoleByIdRequest : IRequest<UserRoleByIdResponse?>
    {
        public int RoleId { get; set; }

        public GetUserRoleByIdRequest(int roleId) => RoleId = roleId;
    }
}

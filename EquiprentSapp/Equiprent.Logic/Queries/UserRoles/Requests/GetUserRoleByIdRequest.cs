using Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Requests
{
    public record GetUserRoleByIdRequest : IQuery<UserRoleByIdResponse>
    {
        public int RoleId { get; set; }

        public GetUserRoleByIdRequest(int roleId)
        {
            RoleId = roleId;
        }
    }
}

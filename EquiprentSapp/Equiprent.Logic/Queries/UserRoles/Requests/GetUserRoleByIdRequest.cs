using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Messages
{
    public record GetUserRoleByIdRequest : IQuery<DetailsResponse>
    {
        public int RoleId { get; set; }

        public GetUserRoleByIdRequest(int roleId)
        {
            RoleId = roleId;
        }
    }
}

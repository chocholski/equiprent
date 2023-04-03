using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Messages
{
    public record GetUserRoleByIdMessage : IQuery<DetailsModel>
    {
        public int RoleId { get; set; }

        public GetUserRoleByIdMessage(int roleId)
        {
            RoleId = roleId;
        }
    }
}

using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetUserByIdRequest : IQuery<DetailsResponse>
    {
        public Guid UserId { get; set; }

        public GetUserByIdRequest(Guid userId) => UserId = userId;
    }
}

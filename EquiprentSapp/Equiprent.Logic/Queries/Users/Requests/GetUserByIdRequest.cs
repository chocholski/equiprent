using Equiprent.Logic.Queries.Users.Responses.UserById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetUserByIdRequest : IQuery<UserByIdResponse>
    {
        public Guid UserId { get; set; }

        public GetUserByIdRequest(Guid userId) => UserId = userId;
    }
}

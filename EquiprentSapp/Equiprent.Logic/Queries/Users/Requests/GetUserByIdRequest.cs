using Equiprent.Logic.Queries.Users.Responses.UserById;
using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetUserByIdRequest : IRequest<UserByIdResponse?>
    {
        public Guid UserId { get; set; }

        public GetUserByIdRequest(Guid userId) => UserId = userId;
    }
}

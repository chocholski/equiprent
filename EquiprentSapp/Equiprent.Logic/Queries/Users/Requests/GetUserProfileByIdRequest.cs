using Equiprent.Logic.Queries.Users.Responses.UserProfileById;
using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetUserProfileByIdRequest : IRequest<UserProfileByIdResponse?>
    {
        public Guid UserId { get; set; }

        public GetUserProfileByIdRequest(Guid userId) => UserId = userId;
    }
}

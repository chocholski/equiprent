using Equiprent.Logic.Queries.Users.Responses.UserLanguageById;
using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetUserLanguageByIdRequest : IRequest<UserLanguageByIdResponse?>
    {
        public Guid UserId { get; set; }

        public GetUserLanguageByIdRequest(Guid userId)
        {
            UserId = userId;
        }
    }
}

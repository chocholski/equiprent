using Equiprent.Logic.Queries.Users.Responses.UserLanguageById;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public record GetUserLanguageByIdRequest : IQuery<UserLanguageByIdResponse>
    {
        public Guid UserId { get; set; }

        public GetUserLanguageByIdRequest(Guid userId)
        {
            UserId = userId;
        }
    }
}

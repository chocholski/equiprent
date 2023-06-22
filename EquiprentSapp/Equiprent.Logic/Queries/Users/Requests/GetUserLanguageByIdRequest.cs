using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetUserLanguageByIdRequest : IQuery<LanguageResponse>
    {
        public Guid UserId { get; set; }

        public GetUserLanguageByIdRequest(Guid userId)
        {
            UserId = userId;
        }
    }
}

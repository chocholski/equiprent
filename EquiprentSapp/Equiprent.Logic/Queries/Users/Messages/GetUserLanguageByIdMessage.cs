using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetUserLanguageByIdMessage : IQuery<LanguageModel>
    {
        public Guid UserId { get; set; }

        public GetUserLanguageByIdMessage(Guid userId)
        {
            UserId = userId;
        }
    }
}

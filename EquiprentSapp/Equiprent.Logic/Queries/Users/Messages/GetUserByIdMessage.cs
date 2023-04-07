using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetUserByIdMessage : IQuery<DetailsModel>
    {
        public Guid UserId { get; set; }

        public GetUserByIdMessage(Guid userId) => UserId = userId;
    }
}

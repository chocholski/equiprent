using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public class GetUserThemeByIdRequest : IQuery<bool>
    {
        public Guid UserId { get; set; }

        public GetUserThemeByIdRequest(Guid userId) => UserId = userId;
    }
}

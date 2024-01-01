using MediatR;

namespace Equiprent.Logic.Queries.Users.Requests
{
    public class GetUserThemeByIdRequest : IRequest<bool>
    {
        public Guid UserId { get; set; }

        public GetUserThemeByIdRequest(Guid userId) => UserId = userId;
    }
}

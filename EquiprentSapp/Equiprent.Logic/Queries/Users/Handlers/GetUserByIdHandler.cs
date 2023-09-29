using Equiprent.Logic.Queries.Users.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.UserById;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserByIdHandler : IQueryHandler<GetUserByIdRequest, UserByIdResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserByIdResponse?> HandleAsync(GetUserByIdRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.UserId);

            if (user is null)
                return null;

            var result = user.Adapt<UserByIdResponse>();

            return result;
        }
    }
}

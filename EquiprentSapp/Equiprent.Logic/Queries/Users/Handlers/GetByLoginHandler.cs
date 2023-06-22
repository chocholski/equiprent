using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetByLoginHandler : IQueryHandler<GetUserByLoginRequest, DetailsResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetByLoginHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<DetailsResponse?> HandleAsync(GetUserByLoginRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Login == request.Login);

            if (user is not null)
            {
                var result = user.Adapt<DetailsResponse>();

                return result;
            }

            return null;
        }
    }
}

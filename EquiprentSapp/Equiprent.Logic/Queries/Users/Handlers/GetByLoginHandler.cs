using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetByLoginHandler : IQueryHandler<GetUserByLoginMessage, DetailsModel>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetByLoginHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<DetailsModel?> HandleAsync(GetUserByLoginMessage requestData)
        {
            var user = await _dbContext.ApplicationUsers.SingleOrDefaultAsync(x => x.Login == requestData.Login);
            if (user != null)
            {
                var result = user.Adapt<DetailsModel>();
                return result;
            }

            return null;
        }
    }
}

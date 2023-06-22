using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetByIdHandler : IQueryHandler<GetUserByIdRequest, DetailsResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetByIdHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<DetailsResponse?> HandleAsync(GetUserByIdRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.UserId);

            if (user is not null)
            {
                var result = user.Adapt<DetailsResponse>();

                return result;
            }

            return null;
        }
    }
}

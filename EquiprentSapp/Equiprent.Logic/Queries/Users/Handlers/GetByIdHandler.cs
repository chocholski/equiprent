using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Data.Services;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetByIdHandler : IQueryHandler<GetUserByIdMessage, DetailsModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public GetByIdHandler(ApplicationDbContext dbcontext, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _userResolverService = userResolverService;
        }

        public async Task<DetailsModel?> HandleAsync(GetUserByIdMessage message)
        {
            var user = await _dbContext.ApplicationUsers
                .SingleOrDefaultAsync(user => user.Id == message.UserId &&
                                              !user.IsDeleted);

            if (user is not null)
            {
                var result = user.Adapt<DetailsModel>();

                return result;
            }

            return null;
        }
    }
}

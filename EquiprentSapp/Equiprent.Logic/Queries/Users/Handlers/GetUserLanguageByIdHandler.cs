using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserLanguageByIdHandler : IQueryHandler<GetUserLanguageByIdRequest, LanguageResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserLanguageByIdHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<LanguageResponse?> HandleAsync(GetUserLanguageByIdRequest request)
        {
            var userLanguageId = await _dbContext.Users
                .Where(u => u.Id == request.UserId && !u.IsDeleted)
                .Select(u => u.LanguageId)
                .SingleOrDefaultAsync();

            var result = new LanguageResponse
            {
                LanguageId = userLanguageId
            };

            return result;
        }
    }
}

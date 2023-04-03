using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Queries.Users.Messages;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserLanguageByIdHandler : IQueryHandler<GetUserLanguageByIdMessage, LanguageModel>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserLanguageByIdHandler(ApplicationDbContext dbcontext)
        {
            _dbContext = dbcontext;
        }

        public async Task<LanguageModel?> HandleAsync(GetUserLanguageByIdMessage message)
        {
            var userLanguageId = await _dbContext.ApplicationUsers
                .Where(x => x.Id == message.UserId && !x.IsDeleted)
                .Select(y => y.LanguageId)
                .SingleOrDefaultAsync();

            var result = new LanguageModel
            {
                LanguageId = userLanguageId
            };

            return result;
        }
    }
}

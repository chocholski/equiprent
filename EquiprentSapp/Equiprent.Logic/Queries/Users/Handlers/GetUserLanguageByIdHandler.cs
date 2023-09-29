using Equiprent.Logic.Queries.Users.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.UserLanguageById;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserLanguageByIdHandler : IQueryHandler<GetUserLanguageByIdRequest, UserLanguageByIdResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserLanguageByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserLanguageByIdResponse?> HandleAsync(GetUserLanguageByIdRequest request)
        {
            var userLanguageId = await _dbContext.Users
                .Where(u =>
                    u.Id == request.UserId &&
                    !u.IsDeleted)
                .Select(u => u.LanguageId)
                .SingleOrDefaultAsync();

            var result = new UserLanguageByIdResponse { LanguageId = userLanguageId };

            return result;
        }
    }
}

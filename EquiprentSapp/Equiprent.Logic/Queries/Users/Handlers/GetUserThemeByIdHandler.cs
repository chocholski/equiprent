using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserThemeByIdHandler : IQueryHandler<GetUserThemeByIdRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserThemeByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> HandleAsync(GetUserThemeByIdRequest request)
        {
            return await _dbContext.Users
                .Where(u =>
                    !u.IsDeleted &&
                    u.Id == request.UserId)
                .Select(u => u.HasDarkModeThemeSelected)
                .SingleOrDefaultAsync();
        }
    }
}

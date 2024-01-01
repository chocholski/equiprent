using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Requests;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserThemeByIdHandler : IRequestHandler<GetUserThemeByIdRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserThemeByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(GetUserThemeByIdRequest request, CancellationToken cancellationToken)
        {
            return await _dbContext.Users
                .Where(u =>
                    !u.IsDeleted &&
                    u.Id == request.UserId)
                .Select(u => u.HasDarkModeThemeSelected)
                .SingleOrDefaultAsync(cancellationToken);
        }
    }
}

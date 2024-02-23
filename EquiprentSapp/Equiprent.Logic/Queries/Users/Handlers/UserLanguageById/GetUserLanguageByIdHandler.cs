using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.UserLanguageById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers.UserLanguageById
{
    public class GetUserLanguageByIdHandler : IRequestHandler<GetUserLanguageByIdRequest, UserLanguageByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserLanguageByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserLanguageByIdResponse?> Handle(GetUserLanguageByIdRequest request, CancellationToken cancellationToken)
        {
            var userLanguageId = await _dbContext.Users
                .Where(u =>
                    u.Id == request.UserId &&
                    !u.IsDeleted)
                .Select(u => u.LanguageId)
                .SingleOrDefaultAsync(cancellationToken);

            return new UserLanguageByIdResponse { LanguageId = userLanguageId };
        }
    }
}

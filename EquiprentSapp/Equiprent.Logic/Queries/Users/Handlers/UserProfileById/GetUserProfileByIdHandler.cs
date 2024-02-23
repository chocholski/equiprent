using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Logic.Queries.Users.Responses.UserProfileById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers.UserProfileById
{
    public class GetUserProfileByIdHandler : IRequestHandler<GetUserProfileByIdRequest, UserProfileByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserProfileByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserProfileByIdResponse?> Handle(GetUserProfileByIdRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u =>
                    !u.IsDeleted && u.Id == request.UserId,
                    cancellationToken);

            if (user is null)
                return null;

            var result = user.Adapt<UserProfileByIdResponse>();

            return result;
        }
    }
}

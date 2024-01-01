using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Queries.Users.Responses.UserById;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Users.Handlers
{
    public class GetUserByIdHandler : IRequestHandler<GetUserByIdRequest, UserByIdResponse?>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetUserByIdHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<UserByIdResponse?> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u =>
                    !u.IsDeleted && u.Id == request.UserId,
                    cancellationToken);

            if (user is null)
                return null;

            var result = user.Adapt<UserByIdResponse>();

            return result;
        }
    }
}

using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.SaveProfile;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class SaveProfileHandler : IRequestHandler<SaveProfileRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;

        public SaveProfileHandler(ApplicationDbContext dbContext, IPasswordHasher passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        public async Task<CommandResult> Handle(SaveProfileRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id, cancellationToken);

            if (user is null)
                return CommandResult.BadRequest;

            user.Email = request.Email;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;

            if (!string.IsNullOrEmpty(request.Password))
                user.Password = _passwordHasher.GetHash(request.Password);

            await _dbContext.Users.UpdateAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}

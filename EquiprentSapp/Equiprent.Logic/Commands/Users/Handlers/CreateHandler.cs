using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.Create;
using Equiprent.Entities.Application.Users;
using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users.Passwords;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;

        public CreateHandler(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
        }

        public async Task<CommandResult> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var loginExists = await _dbContext.Users
                .AnyAsync(u => u.Login == request.Login, cancellationToken);

            if (loginExists)
                return CommandResult.User_LoginExists;

            if (!request.LanguageId.HasValue ||
                !request.UserRoleId.HasValue)
            {
                return CommandResult.BadRequest;
            }

            var user = new User
            {
                CreatedById = request.CreatedById,
                CreatedOn = DateTime.Now,
                Email = request.Email,
                FirstName = request.FirstName,
                IsActive = request.IsActive,
                LanguageId = request.LanguageId.Value,
                LastName = request.LastName,
                Login = request.Login,
                Password = _passwordHasher.GetHash(request.Password),
                UserRoleId = request.UserRoleId.Value
            };

            await _dbContext.Users.AddAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}

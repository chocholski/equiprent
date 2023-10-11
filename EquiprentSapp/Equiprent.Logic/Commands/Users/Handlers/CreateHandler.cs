using Equiprent.ApplicationServices.Users;
using Equiprent.Entities.Application;
using Equiprent.Data.Services;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;
using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Logic.Commands.Users.Requests.Create;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class CreateHandler : ICommandHandler<CreateRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IUserService _userResolverService;

        public CreateHandler(
            ApplicationDbContext dbContext,
            IPasswordHasher passwordHasher,
            IUserService userResolverService)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var loginExists = await _dbContext.Users
                .AnyAsync(u => u.Login == request.Login);

            if (loginExists)
                return CommandResult.User_LoginExists;

            var createdById = _userResolverService.GetUserId();

            if (!createdById.HasValue ||
                !request.LanguageId.HasValue ||
                !request.UserRoleId.HasValue)
            {
                return CommandResult.BadRequest;
            }

            var user = new User
            {
                CreatedById = createdById.Value,
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

            await _dbContext.Users.AddAndSaveAsync(user);

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(CreateRequest request)
        {
            if (await _dbContext.Users.Where(u => u.Login == request.Login).AnyAsync())
                return CommandResult.User_LoginExists;

            if (string.IsNullOrEmpty(request.Password))
                return CommandResult.BadRequest;

            return CommandResult.OK;
        }
    }
}

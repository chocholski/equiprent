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

        public CreateHandler(ApplicationDbContext dbcontext, IPasswordHasher passwordHasher, IUserService userResolverService)
        {
            _dbContext = dbcontext;
            _passwordHasher = passwordHasher;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var user = new User
            {
                Login = request.Login,
                Password = _passwordHasher.GetHash(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                IsActive = request.IsActive,
                LanguageId = request.LanguageId,
                CreatedOn = DateTime.Now,
                CreatedById = _userResolverService.GetUserId()!.Value,
                UserRoleId = request.UserRoleId
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

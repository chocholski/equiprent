using Equiprent.ApplicationServices.ApplicationUser;
using Equiprent.Entities.Application;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Data.Services;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class CreateHandler : ICommandHandler<CreateMessage>
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

        public async Task<CommandResult> HandleAsync(CreateMessage message)
        {
            var validationResult = await Validate(message);
            if (validationResult is not CommandResult.OK)
            {
                return validationResult;
            }

            var user = new User
            {
                Login = message.Login,
                Password = _passwordHasher.GetHash(message.Password),
                FirstName = message.FirstName,
                LastName = message.LastName,
                Email = message.Email,
                IsActive = message.IsActive,
                LanguageId = message.LanguageId,
                CreatedOn = DateTime.Now,
                CreatedById = _userResolverService.GetUserId()!.Value,
                UserRoleId = message.UserRoleId
            };

            _dbContext.ApplicationUsers.Add(user);
            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
        }

        private async Task<CommandResult> Validate(CreateMessage message)
        {
            if (await _dbContext.ApplicationUsers.AnyAsync(x => x.Login == message.Login))
            {
                return CommandResult.User_LoginExists;
            }

            if (string.IsNullOrEmpty(message.Password))
            {
                return CommandResult.BadRequest;
            }

            return CommandResult.OK;
        }
    }
}

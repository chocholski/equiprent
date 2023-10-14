using Equiprent.ApplicationServices.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Data.Services;
using Equiprent.Logic.Commands.Users.Requests.ChangeTheme;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeThemeHandler : ICommandHandler<ChangeThemeRequest>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userService;

        public ChangeThemeHandler(
            ApplicationDbContext dbContext,
            IUserService userService)
        {
            _dbContext = dbContext;
            _userService = userService;
        }

        public async Task<CommandResult> HandleAsync(ChangeThemeRequest request)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id);

            if (user is null)
                return CommandResult.BadRequest;

            user.HasDarkModeThemeSelected = !user.HasDarkModeThemeSelected;

            await _dbContext.Users.UpdateAndSaveAsync(user);

            return CommandResult.OK;
        }
    }
}

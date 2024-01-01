using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeTheme;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.Users.Handlers
{
    public class ChangeThemeHandler : IRequestHandler<ChangeThemeRequest, CommandResult>
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

        public async Task<CommandResult> Handle(ChangeThemeRequest request, CancellationToken cancellationToken)
        {
            var user = await _dbContext.Users
                .SingleOrDefaultAsync(u => !u.IsDeleted && u.Id == request.Id, cancellationToken);

            if (user is null)
                return CommandResult.BadRequest;

            user.HasDarkModeThemeSelected = !user.HasDarkModeThemeSelected;
            await _dbContext.Users.UpdateAndSaveAsync(user, cancellationToken);

            return CommandResult.OK;
        }
    }
}

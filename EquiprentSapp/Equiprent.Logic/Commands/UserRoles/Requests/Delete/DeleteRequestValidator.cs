using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.UserRoles.Requests.Delete
{
    public class DeleteRequestValidator : RequestValidator<DeleteRequest>
    {
        private readonly IUserService _userService;

        public DeleteRequestValidator(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider,
            IUserService userService) : base(dbContext, serviceProvider)
        {
            _userService = userService;
        }

        protected override CommandResult ValidateRequestWithDatabase(DeleteRequest request)
        {
            var userId = _userService.GetUserId();

            if (!userId.HasValue)
                return CommandResult.BadRequest;

            var userRoleId = _dbContext.Users
                .Where(u => u.Id == userId)
                .Select(u => u.UserRoleId)
                .SingleOrDefault();

            if (userRoleId == request.Id)
                return CommandResult.UserRole_TheOnlyAssignedRoleDeletionAttempt;

            var isUserRoleAssigned = _dbContext.Users
                .Any(u => u.UserRoleId == request.Id);

            if (isUserRoleAssigned)
                return CommandResult.UserRole_AssignedRoleDeletionAttempt;

            return CommandResult.OK;
        }
    }
}

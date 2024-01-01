using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Commands.Users.Requests.ChangeRole
{
    public class ChangeRoleRequestValidator : RequestValidator<ChangeRoleRequest>
    {
        public ChangeRoleRequestValidator(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider) { }

        protected override CommandResult ValidateRequestWithDatabase(ChangeRoleRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var userHasUserRoleChosenAlreadyAssigned = _dbContext.Users
                .Where(u =>
                    !u.IsDeleted &&
                    u.Id == request.UserId &&
                    u.UserRoleId == request.UserRoleId)
                .Any();

            if (userHasUserRoleChosenAlreadyAssigned)
                return CommandResult.UserRole_UserHasBeenAlreadyAssignedToRole;

            return CommandResult.OK;
        }
    }
}

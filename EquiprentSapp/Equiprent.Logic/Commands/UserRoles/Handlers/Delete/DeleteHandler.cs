using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.Users;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.UserRoles.Requests.Delete;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.UserRoles.Handlers.Delete
{
    public class DeleteHandler : IRequestHandler<DeleteRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserService _userResolverService;

        public DeleteHandler(
            ApplicationDbContext dbContext,
            IUserService userResolverService)
        {
            _dbContext = dbContext;
            _userResolverService = userResolverService;
        }

        public async Task<CommandResult> Handle(DeleteRequest request, CancellationToken cancellationToken)
        {
            var userRole = await _dbContext.UserRoles
                .SingleOrDefaultAsync(role => role.Id == request.Id, cancellationToken);

            if (userRole is null)
                return CommandResult.BadRequest;

            await DeleteUserRolePermissionsAsync(userRole.Id, cancellationToken);
            await _dbContext.UserRoles.SoftDeleteAndSaveAsync(userRole, cancellationToken);

            return CommandResult.OK;
        }

        private async Task DeleteUserRolePermissionsAsync(int roleId, CancellationToken cancellationToken = default)
        {
            var userRolePermissions = await _dbContext.UserPermissionToRoles
                .Where(permissionToRole => permissionToRole.UserRoleId == roleId)
                .ToListAsync(cancellationToken);

            await _dbContext.UserPermissionToRoles.RemoveRangeAndSaveAsync(userRolePermissions, cancellationToken);
        }
    }
}

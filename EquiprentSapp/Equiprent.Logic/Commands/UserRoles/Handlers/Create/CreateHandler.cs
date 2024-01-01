using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserPermissionToRoles;
using Equiprent.Entities.Application.UserRoles;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.UserRoles.Requests.Create;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Commands.UserRoles.Handlers.Create
{
    public class CreateHandler : IRequestHandler<CreateRequest, CommandResult>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionService _userPermissionsService;

        public CreateHandler(
            ApplicationDbContext dbContext,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbContext;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> Handle(CreateRequest request, CancellationToken cancellationToken)
        {
            var userRole = new UserRole();
            _dbContext.UserRoles.Add(userRole);
            AddUserRoleToLanguages(userRole, request.NameInLanguages);
            await AddUserRolePermissionsAsync(userRole, request.PermissionsSelected, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return CommandResult.OK;
        }

        private void AddUserRoleToLanguages(UserRole roleBeingCreated, IEnumerable<NameInLanguage> namesInLanguages)
        {
            _dbContext.UserRolesToLanguages.AddRange(
                namesInLanguages
                    .Select(nameInLanguage => new UserRoleToLanguage
                    {
                        UserRole = roleBeingCreated,
                        Name = nameInLanguage.Name,
                        LanguageId = nameInLanguage.LanguageId
                    }));
        }

        private async Task AddUserRolePermissionsAsync(UserRole roleBeingCreated, IEnumerable<PermissionItemModel> selectedUserPermissionsFromRequest, CancellationToken cancellationToken = default)
        {
            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync(cancellationToken);

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromRequest = selectedUserPermissionsFromRequest
                .Where(selectedPermission => allUserPermissionsIds.Contains(selectedPermission.Id))
                .Select(selectedPermission => selectedPermission.Id)
                .ToList();

            var userPermissionIdsForRoleBeingCreated = await AppendWithLinkedUserPermissionsAsync(userPermissionIdsFromRequest, cancellationToken);

            _dbContext.UserPermissionToRoles.AddRange(
                userPermissionIdsForRoleBeingCreated
                    .Select(id => new UserPermissionToRole
                    {
                        UserPermissionId = id,
                        UserRole = roleBeingCreated
                    }));
        }

        private async Task<ISet<int>> AppendWithLinkedUserPermissionsAsync(IEnumerable<int> userPermissionIds, CancellationToken cancellationToken = default)
        {
            var result = new HashSet<int>(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(id, cancellationToken);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                    result.Add(linkedUserPermissionId);
            }

            return result;
        }
    }
}

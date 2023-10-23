using Equiprent.ApplicationServices.CommandResults;
using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.UserRoles.Requests.Create;
using Equiprent.Logic.Infrastructure.CQRS;
using Microsoft.IdentityModel.Tokens;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class CreateHandler : ICommandHandler<CreateRequest>
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

        public async Task<CommandResult> ValidateAsync(CreateRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var existingUserRolesNamesInLanguages = await _dbContext.UserRolesToLanguages
                .GroupBy(roleToLanguage => roleToLanguage.LanguageId)
                .Select(g => new { g.Key, Names = g.ToList().Select(roleToLanguage => roleToLanguage.Name).ToList() })
                .ToDictionaryAsync(kvp => kvp.Key, kvp => kvp.Names);

            var doesUserRoleExistWithinDatabase = request.NameInLanguages
                .Any(userRole =>
                    existingUserRolesNamesInLanguages.Any(roleNameInLanguage =>
                        roleNameInLanguage.Key == userRole.LanguageId &&
                        roleNameInLanguage.Value.Contains(userRole.Name)));

            if (doesUserRoleExistWithinDatabase)
                return CommandResult.UserRole_ExistsInDatabase;

            if (request.PermissionsSelected.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var userRole = new UserRole();

            _dbContext.UserRoles.Add(userRole);

            AddUserRoleToLanguages(userRole, request.NameInLanguages);

            await AddUserRolePermissionsAsync(userRole, request.PermissionsSelected);

            await _dbContext.SaveChangesAsync();

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

        private async Task AddUserRolePermissionsAsync(UserRole roleBeingCreated, IEnumerable<PermissionItemModel> selectedUserPermissionsFromRequest)
        {
            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromRequest = selectedUserPermissionsFromRequest
                .Where(selectedPermission => allUserPermissionsIds.Contains(selectedPermission.Id))
                .Select(selectedPermission => selectedPermission.Id)
                .ToList();

            var userPermissionIdsForRoleBeingCreated = await AppendWithLinkedUserPermissionsAsync(userPermissionIdsFromRequest);

            _dbContext.UserPermissionToRoles.AddRange(
                userPermissionIdsForRoleBeingCreated
                    .Select(id => new UserPermissionToRole
                        {
                            UserPermissionId = id,
                            UserRole = roleBeingCreated
                        }));
        }

        private async Task<ISet<int>> AppendWithLinkedUserPermissionsAsync(IEnumerable<int> userPermissionIds)
        {
            var result = new HashSet<int>(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                    result.Add(linkedUserPermissionId);
            }

            return result;
        }
    }
}

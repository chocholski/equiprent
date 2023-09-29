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

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var userRole = new UserRole();

            _dbContext.UserRoles.Add(userRole);

            await AddUserRoleToLanguagesAsync(userRole, request.NameInLanguages);
            await _dbContext.SaveChangesAsync();

            await AddUserRolePermissionsAsync(userRole.Id, request.UserPermissionsForUserRoleList);
            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
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

            if (request.UserPermissionsForUserRoleList.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }

        private async Task AddUserRoleToLanguagesAsync(UserRole userRole, IEnumerable<NameInLanguage> namesInLanguages)
        {
            await _dbContext.UserRolesToLanguages.AddRangeAndSaveAsync(
                namesInLanguages
                    .Select(nameInLanguage => new UserRoleToLanguage
                        {
                            UserRole = userRole,
                            Name = nameInLanguage.Name,
                            LanguageId = nameInLanguage.LanguageId
                        }));
        }

        private async Task AddUserRolePermissionsAsync(int roleId, IEnumerable<UserRolePermissionsListItemModel> userPermissionsFromRequest)
        {
            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromMessage = userPermissionsFromRequest
                .Where(i =>
                    i.IsSelected &&
                    allUserPermissionsIds.Contains(i.UserPermissionId))
                .Select(i => i.UserPermissionId)
                .ToList();

            var userPermissionsIds = await AppendWithLinkedUserPermissionsAsync(userPermissionIdsFromMessage);

            await _dbContext.UserPermissionToRoles.AddRangeAndSaveAsync(
                userPermissionsIds
                    .Select(id => new UserPermissionToRole
                        {
                            UserPermissionId = id,
                            UserRoleId = roleId
                        }));
        }

        private async Task<ISet<int>> AppendWithLinkedUserPermissionsAsync(IEnumerable<int> userPermissionIds)
        {
            var result = new HashSet<int>(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                    result.Add(linkedUserPermissionId);
            }

            return result;
        }
    }
}

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
            ApplicationDbContext dbcontext,
            IUserPermissionService userPermissionsService)
        {
            _dbContext = dbcontext;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> HandleAsync(CreateRequest request)
        {
            var userRole = new UserRole
            {
                IsDeleted = false
            };

            _dbContext.UserRoles.Add(userRole);

            await AddUserRoleToLanguagesAsync(userRole, request.NameInLanguages);
            await _dbContext.SaveChangesAsync();

            await AddUserPermissionsForRoleAsync(userRole.Id, request.UserPermissionsForUserRoleList);
            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
        }

        public async Task<CommandResult> ValidateAsync(CreateRequest request)
        {
            if (request is null)
                return CommandResult.BadRequest;

            var existingUserRolesNamesInLanguages = await _dbContext.UserRolesToLanguages
                .GroupBy(u => u.LanguageId)
                .Select(g => new { g.Key, Names = g.ToList().Select(x => x.Name).ToList() })
                .ToDictionaryAsync(p => p.Key, p => p.Names);

            var roleExists = false;

            foreach (var userRole in request.NameInLanguages)
            {
                if (existingUserRolesNamesInLanguages.Any(n => n.Key == userRole.LanguageId && n.Value.Contains(userRole.Name)))
                {
                    roleExists = true;

                    break;
                }
            }

            if (roleExists)
                return CommandResult.UserRole_ExistsInDatabase;

            if (request.UserPermissionsForUserRoleList.IsNullOrEmpty())
                return CommandResult.UserRole_NoUserPermissionAssigned;

            return CommandResult.OK;
        }

        private async Task AddUserRoleToLanguagesAsync(UserRole userRole, List<NameInLanguage> namesInLanguages)
        {
            await _dbContext.UserRolesToLanguages.AddRangeAndSaveAsync(namesInLanguages.Select(l => new UserRoleToLanguage
            {
                UserRole = userRole,
                Name = l.Name,
                LanguageId = l.LanguageId
            }));
        }

        private async Task AddUserPermissionsForRoleAsync(int roleId, List<CreateRequest.UserPermissionsForUserRoleListItemModel> userPermissionsFromRequest)
        {
            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(p => p.Id)
                .ToList();

            var userPermissionIdsFromMessage = userPermissionsFromRequest
                .Where(i => i.IsSelected &&
                            allUserPermissionsIds.Contains(i.UserPermissionId))
                .Select(i => i.UserPermissionId)
                .ToList();

            var userPermissionsIds = await AppendWithLinkedUserPermissionsIfNecessaryAsync(userPermissionIdsFromMessage);

            await _dbContext.UserPermissionToRoles.AddRangeAndSaveAsync(userPermissionsIds.Select(id => new UserPermissionToRole
            {
                UserPermissionId = id,
                UserRoleId = roleId
            }));
        }

        private async Task<ISet<int>> AppendWithLinkedUserPermissionsIfNecessaryAsync(List<int> userPermissionIds)
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

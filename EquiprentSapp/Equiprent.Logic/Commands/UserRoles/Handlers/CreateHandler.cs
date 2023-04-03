using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Entities.Application;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Logic.Commands.UserRoles.Handlers
{
    public class CreateHandler : ICommandHandler<CreateMessage>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionsService _userPermissionsService;        

        public CreateHandler(ApplicationDbContext dbcontext, IUserPermissionsService userPermissionsService)
        {
            _dbContext = dbcontext;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<CommandResult> HandleAsync(CreateMessage message)
        {
            var validationResult = await Validate(message);
            if (validationResult is not CommandResult.OK)
            {
                return validationResult;
            }

            var userRole = new UserRole
            {
                IsDeleted = false
            };

            _dbContext.UserRoles.Add(userRole);

            await AddUserRoleToLanguages(userRole, message.NameInLanguages);
            await _dbContext.SaveChangesAsync();

            await AddUserPermissionsForRole(userRole.Id, message.UserPermissionsForUserRoleList);
            await _dbContext.SaveChangesAsync();

            return CommandResult.OK;
        }

        private async Task<CommandResult> Validate(CreateMessage message)
        {
            if (message is null)
            {
                return CommandResult.BadRequest;
            }

            var existingUserRolesNamesInLanguages = await _dbContext.UserRolesToLanguages
                .GroupBy(x => x.LanguageId)
                .Select(g => new { g.Key, Names = g.ToList().Select(x => x.Name).ToList() })
                .ToDictionaryAsync(p => p.Key, p => p.Names);

            var roleWithSameDataExists = false;

            foreach (var userRole in message.NameInLanguages)
            {
                if (existingUserRolesNamesInLanguages
                    .Any(x => x.Key == userRole.LaguageId &&
                                x.Value.Contains(userRole.Name)))
                {
                    roleWithSameDataExists = true;
                    break;
                }
            }

            if (roleWithSameDataExists)
            {
                return CommandResult.Role_ExistsInDatabase;
            }

            if (message.UserPermissionsForUserRoleList is null ||
                !message.UserPermissionsForUserRoleList.Any())
            {
                return CommandResult.Role_NoUserPermissionAssigned;
            }

            return CommandResult.OK;
        }

        private async Task AddUserRoleToLanguages(UserRole userRole, List<NameInLanguage> namesInLanguages)
        {
            foreach (var item in namesInLanguages)
            {
                _dbContext.UserRolesToLanguages.Add(new UserRoleToLanguage
                {
                    UserRole = userRole,
                    Name = item.Name,
                    LanguageId = item.LaguageId
                });
            }

            await Task.CompletedTask;
        }

        private async Task AddUserPermissionsForRole(int roleId, List<CreateMessage.UserPermissionsForUserRoleListItemModel> userPermissionsFromMessage)
        {
            var allUserPermissions = await _userPermissionsService
                .GetAllUserPermissionsAsync();

            var allUserPermissionsIds = allUserPermissions
                .Select(x => x.Id)
                .ToList();

            var userPermissionIdsFromMessage = userPermissionsFromMessage
                .Where(x => x.IsSelected &&
                            allUserPermissionsIds.Contains(x.UserPermissionId))
                .Select(x => x.UserPermissionId)
                .ToList();

            var userPermissionsIds = await AppendWithLinkedUserPermissionsIfNecessary(userPermissionIdsFromMessage);

            userPermissionsIds.ForEach(id =>
                _dbContext.UserPermissionToRoles.Add(new UserPermissionToRole
                {
                    UserPermissionId = id,
                    UserRoleId = roleId
                }));
        }

        private async Task<List<int>> AppendWithLinkedUserPermissionsIfNecessary(List<int> userPermissionIds)
        {
            var resultPermissionIds = new List<int>();

            resultPermissionIds.AddRange(userPermissionIds);

            foreach (var id in userPermissionIds)
            {
                var linkedUserPermissionIds = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(id);

                foreach (var linkedUserPermissionId in linkedUserPermissionIds)
                {
                    if (!userPermissionIds.Contains(linkedUserPermissionId))
                    {
                        resultPermissionIds.Add(linkedUserPermissionId);
                    }
                }
            }

            var result = resultPermissionIds.Distinct().ToList();

            return result;
        }
    }
}

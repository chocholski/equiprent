using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetUserPermissionsForRoleCreationHandler : IQueryHandler<GetUserPermissionsForUserRoleCreationMessage, UserPermissionsForUserRoleCreationModel>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserPermissionsService _userPermissionsService;

        public GetUserPermissionsForRoleCreationHandler(ApplicationDbContext dbContext, IUserPermissionsService userPermissionsService)
        {
            _dbContext = dbContext;
            _userPermissionsService = userPermissionsService;
        }

        public async Task<UserPermissionsForUserRoleCreationModel?> HandleAsync(GetUserPermissionsForUserRoleCreationMessage message)
        {
            var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync();

            var allUserPermissionsInGroups = allUserPermissions
                .GroupBy(permission => permission.SystemName.Split("_")[0])
                .Select(group => new
                {
                    GroupName = $"Permissions.{ group.Key }",
                    PermissionsList = group.ToList()
                })
                .ToList();

            var listGroupModel = new List<UserPermissionForUserRoleCreationListGroupModel>();

            foreach (var group in allUserPermissionsInGroups)
            {
                var groupModel = new UserPermissionForUserRoleCreationListGroupModel();

                groupModel.GroupName = group.GroupName;

                foreach(var permission in group.PermissionsList)
                {
                    groupModel.Permissions.Add(new UserPermissionForUserRoleCreationListItemModel
                    {
                        UserPermissionId = permission.Id,
                        SystemName = permission.SystemName,
                        Name = permission.Name,
                        IsSelected = false,
                        LinkedUserPermissions = await GetLinkedUserPermissions(permission.Id)
                    });
                }

                listGroupModel.Add(groupModel);
            }

            return new UserPermissionsForUserRoleCreationModel
            {
                List = listGroupModel
            };
        }

        private async Task<List<int>> GetLinkedUserPermissions(int userPermissionId)
        {
            var result = new List<int>();

            var linkedUserPermissions = await _dbContext.UserPermissionToUserPermissions
                .Where(permission => permission.UserPermissionId == userPermissionId)
                .Select(permission => permission.LinkedUserPermissionId)
                .ToListAsync();

            if (linkedUserPermissions is not null && linkedUserPermissions.Any())
            {
                result.AddRange(linkedUserPermissions);
            }

            return result;
        }
    }
}

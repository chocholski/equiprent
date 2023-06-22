using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetUserPermissionsForRoleCreationHandler : IQueryHandler<GetUserPermissionsForUserRoleCreationRequest, UserPermissionsForUserRoleCreationResponse>
    {
        private readonly IUserPermissionService _userPermissionsService;

        public GetUserPermissionsForRoleCreationHandler(IUserPermissionService userPermissionsService)
        {
            _userPermissionsService = userPermissionsService;
        }

        public async Task<UserPermissionsForUserRoleCreationResponse?> HandleAsync(GetUserPermissionsForUserRoleCreationRequest message)
        {
            var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync();

            var allUserPermissionsInGroups = allUserPermissions
                .GroupBy(p => p.SystemName.Split("_")[0])
                .Select(g => new
                {
                    GroupName = $"Permissions.{g.Key}",
                    PermissionsList = g.ToList()
                })
                .ToList();

            var listGroupModel = new List<UserPermissionForUserRoleCreationListGroupModel>();

            foreach (var group in allUserPermissionsInGroups)
            {
                var groupModel = new UserPermissionForUserRoleCreationListGroupModel
                {
                    GroupName = group.GroupName
                };

                foreach (var permission in group.PermissionsList)
                {
                    groupModel.Permissions.Add(new UserPermissionForUserRoleCreationListItemModel
                    {
                        UserPermissionId = permission.Id,
                        SystemName = permission.SystemName,
                        Name = permission.Name,
                        IsSelected = false,
                        LinkedUserPermissions = await _userPermissionsService.GetAllLinkedPermissionsIdsAsync(permission.Id)
                    });
                }

                listGroupModel.Add(groupModel);
            }

            return new UserPermissionsForUserRoleCreationResponse
            {
                List = listGroupModel
            };
        }
    }
}

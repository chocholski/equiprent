using Equiprent.ApplicationServices.UserPermissions;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Handlers
{
    public class GetUserRolePermissionsForCreationHandler : IQueryHandler<GetUserRolePermissionsForCreationRequest, UserRolePermissionsForCreationResponse>
    {
        private readonly IUserPermissionService _userPermissionsService;

        public GetUserRolePermissionsForCreationHandler(IUserPermissionService userPermissionsService)
        {
            _userPermissionsService = userPermissionsService;
        }

        public async Task<UserRolePermissionsForCreationResponse?> HandleAsync(GetUserRolePermissionsForCreationRequest message)
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

            var listGroupModel = new List<UserRolePermissionForCreationListGroupModel>();

            foreach (var group in allUserPermissionsInGroups)
            {
                var groupModel = new UserRolePermissionForCreationListGroupModel
                {
                    GroupName = group.GroupName
                };

                foreach (var permission in group.PermissionsList)
                {
                    groupModel.Permissions.Add(new UserRolePermissionForCreationListItemModel
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

            return new UserRolePermissionsForCreationResponse
            {
                List = listGroupModel
            };
        }
    }
}

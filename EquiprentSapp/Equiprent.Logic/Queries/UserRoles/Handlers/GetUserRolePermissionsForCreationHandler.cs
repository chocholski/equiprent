using Equiprent.ApplicationInterfaces.UserPermissions;
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

            var groupedPermissions = allUserPermissions
                .GroupBy(p => p.SystemName.Split("_")[0])
                .Select(g => new
                {
                    Name = $"Permissions.{g.Key}",
                    Permissions = g.ToList()
                })
                .ToList();

            var permissionGroupModel = new List<PermissionGroupModel>();

            foreach (var permissionsGroup in groupedPermissions)
            {
                var permissionGroupItemModel = new PermissionGroupModel
                {
                    Name = permissionsGroup.Name
                };

                foreach (var permission in permissionsGroup.Permissions)
                {
                    permissionGroupItemModel.Permissions.Add(new PermissionItemModel
                    {
                        Id = permission.Id,
                        IsSelected = false,
                        LinkedPermissionsIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(permission.Id),
                        Name = permission.Name,
                        SystemName = permission.SystemName,
                    });
                }

                permissionGroupModel.Add(permissionGroupItemModel);
            }

            return new UserRolePermissionsForCreationResponse
            {
                List = permissionGroupModel
            };
        }
    }
}

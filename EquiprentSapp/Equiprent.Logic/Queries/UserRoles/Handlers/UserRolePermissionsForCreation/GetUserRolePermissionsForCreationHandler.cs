using Equiprent.ApplicationInterfaces.UserPermissions;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.UserRoles.Handlers.UserRolePermissionsForCreation
{
    public class GetUserRolePermissionsForCreationHandler : IRequestHandler<GetUserRolePermissionsForCreationRequest, UserRolePermissionsForCreationResponse?>
    {
        private readonly IUserPermissionService _userPermissionsService;

        public GetUserRolePermissionsForCreationHandler(IUserPermissionService userPermissionsService)
        {
            _userPermissionsService = userPermissionsService;
        }

        public async Task<UserRolePermissionsForCreationResponse?> Handle(GetUserRolePermissionsForCreationRequest request, CancellationToken cancellationToken)
        {
            var allUserPermissions = await _userPermissionsService.GetAllUserPermissionsAsync(cancellationToken);

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
                        LinkedPermissionsIds = await _userPermissionsService.GetIdsOfPermissionsLinkedToPermissionAsync(permission.Id, cancellationToken),
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

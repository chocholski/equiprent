using Equiprent.Entities.Application.UserPermissions;

namespace Equiprent.ApplicationInterfaces.UserPermissions
{
    public interface IUserPermissionService
    {
        public Task<HashSet<int>> AppendPermissionsWithLinkedUserPermissionsAsync(List<int> userPermissionIds, CancellationToken cancellationToken = default);
        public Task<List<UserPermission>> GetAllUserPermissionsAsync(CancellationToken cancellationToken = default);
        public Task<List<UserPermission>> GetUserPermissionsForUserAsync(Guid userId, CancellationToken cancellationToken = default);
        public Task<List<UserPermission>> GetUserRolePermissionsAsync(int roleId, CancellationToken cancellationToken = default);
        public Task<List<int>> GetIdsOfPermissionsLinkedToPermissionAsync(int permissionId, CancellationToken cancellationToken = default);
        public Task<bool> IsPermissionLinkedAsync(int permissionId, CancellationToken cancellationToken = default);
    }
}

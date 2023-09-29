using Equiprent.Entities.Application;

namespace Equiprent.ApplicationServices.UserPermissions
{
    public interface IUserPermissionService
    {
        public Task<List<UserPermission>> GetAllUserPermissionsAsync();
        public Task<List<UserPermission>> GetUserPermissionsForUserAsync(Guid userId);
        public Task<List<UserPermission>> GetUserRolePermissionsAsync(int roleId);
        public Task<List<int>> GetAllLinkedPermissionsIdsAsync(int permissionId);
        public Task<bool> IsPermissionLinked(int permissionId);
    }
}

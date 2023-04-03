using Equiprent.Entities.Application;

namespace Equiprent.ApplicationServices.UserPermissions
{
    public interface IUserPermissionsService
    {
        public Task<List<UserPermission>> GetAllUserPermissionsAsync();
        public Task<List<UserPermission>> GetUserPermissionsForUserAsync(int userId);
        public Task<List<UserPermission>> GetUserPermissionsForRoleAsync(int roleId);
        public Task<List<int>> GetAllLinkedPermissionsIdsAsync(int permissionId);
        public Task<bool> IsPermissionLinked(int permissionId);
    }
}

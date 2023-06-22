using Equiprent.Entities.Application;

namespace Equiprent.ApplicationServices.UserPermissions
{
    public interface IUserPermissionService
    {
        public Task<List<Entities.Application.UserPermission>> GetAllUserPermissionsAsync();
        public Task<List<Entities.Application.UserPermission>> GetUserPermissionsForUserAsync(Guid userId);
        public Task<List<Entities.Application.UserPermission>> GetUserPermissionsForRoleAsync(int roleId);
        public Task<List<int>> GetAllLinkedPermissionsIdsAsync(int permissionId);
        public Task<bool> IsPermissionLinked(int permissionId);
    }
}

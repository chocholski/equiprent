namespace Equiprent.Web.Authorization
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public int[] PermissionIds { get; private set; }

        public PermissionRequirement(int[] permissionIds) => PermissionIds = permissionIds;
    }
}

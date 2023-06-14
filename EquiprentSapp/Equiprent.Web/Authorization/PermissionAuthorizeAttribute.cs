using Microsoft.IdentityModel.Tokens;

namespace Equiprent.Web.Authorization
{
    public class PermissionAuthorizeAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "permissions";

        public PermissionAuthorizeAttribute(params int[] permissionsIds) => Ids = permissionsIds;

        public int[] Ids
        {
            get
            {
                if (Policy is not null)
                {
                    var permissionsIds = Array.ConvertAll(Policy.Substring(POLICY_PREFIX.Length).Split(","), 
                        permissionIdAsString => int.TryParse(permissionIdAsString, out var permissionId) ? permissionId : -1);

                    if (!permissionsIds.IsNullOrEmpty())
                        return permissionsIds;
                }

                return default!;
            }

            set => Policy = $"{ POLICY_PREFIX }{ string.Join(',', value) }";
        }
    }
}

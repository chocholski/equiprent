using Microsoft.IdentityModel.Tokens;

namespace Equiprent.Web.Authorization
{
    public class PermissionRequirementAttribute : AuthorizeAttribute
    {
        const string POLICY_PREFIX = "permissions";

        public PermissionRequirementAttribute(params int[] permissionsIds) => Ids = permissionsIds;

        public int[] Ids
        {
            get
            {
                if (Policy is not null)
                {
                    var permissionsIds = Array.ConvertAll(
                        array: Policy[POLICY_PREFIX.Length..].Split(","), 
                        converter: permissionIdAsString => int.TryParse(permissionIdAsString, out var permissionId) ? permissionId : -1);

                    if (!permissionsIds.IsNullOrEmpty())
                        return permissionsIds;
                }

                return default!;
            }

            set => Policy = $"{ POLICY_PREFIX }{ string.Join(',', value) }";
        }
    }
}

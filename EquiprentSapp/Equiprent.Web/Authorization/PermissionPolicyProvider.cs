using Equiprent.Entities.EnumTypes;
using Microsoft.Extensions.Options;

namespace Equiprent.Web.Authorization
{
    public class PermissionPolicyProvider : IAuthorizationPolicyProvider
    {
        const string POLICY_PREFIX = "permissions";

        public DefaultAuthorizationPolicyProvider FallbackPolicyProvider { get; }

        public PermissionPolicyProvider(IOptions<AuthorizationOptions> options) => FallbackPolicyProvider = new DefaultAuthorizationPolicyProvider(options);

        public Task<AuthorizationPolicy> GetDefaultPolicyAsync() => FallbackPolicyProvider.GetDefaultPolicyAsync();

        public Task<AuthorizationPolicy?> GetPolicyAsync(string policyName)
        {
            if (policyName.StartsWith(POLICY_PREFIX, StringComparison.OrdinalIgnoreCase))
            {
                var permissionsIds = policyName[POLICY_PREFIX.Length..].Equals(typeof(int[]).FullName)
                    ? new int[] { (int)UserPermissionEnum.ForAllLoggedIn }
                    : Array.ConvertAll(
                        policyName[POLICY_PREFIX.Length..].Split(","),
                        permissionIdAsString => int.TryParse(permissionIdAsString, out var permissionId) ? permissionId : -1);

                var policy = new AuthorizationPolicyBuilder();

                policy.AddRequirements(new PermissionRequirement(permissionsIds));

                return Task.FromResult(policy.Build())!;
            }

            return FallbackPolicyProvider!.GetPolicyAsync(policyName)!;
        }

        public Task<AuthorizationPolicy?> GetFallbackPolicyAsync() => FallbackPolicyProvider!.GetFallbackPolicyAsync()!;
    }
}

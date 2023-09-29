using Equiprent.Entities.Enums;
using System.Security.Claims;

namespace Equiprent.Web.Authorization
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        const string POLICY_NAME = "permission";

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.User is null)
                return Task.CompletedTask;

            var roles = context.User.Claims
                .Where(x => (x.Type.StartsWith(ClaimTypes.Role, StringComparison.OrdinalIgnoreCase)))
                .Select(x => x.Value)
                .SingleOrDefault();

            if (string.IsNullOrEmpty(roles))
                return Task.CompletedTask;

            if (requirement is null)
            {
                context.Succeed(requirement!);

                return Task.CompletedTask;
            }

            if (!requirement.PermissionIds.Any())
            {
                context.Succeed(requirement);

                return Task.CompletedTask;
            }

            if (requirement.PermissionIds.Contains((int)UserPermissionEnum.ForAllLoggedIn))
            {
                context.Succeed(requirement);

                return Task.CompletedTask;
            }

            var userPermissionsIds = Array.ConvertAll(
                context.User.Claims
                    .Where(c => (c.Type.StartsWith(POLICY_NAME, StringComparison.OrdinalIgnoreCase)))
                    .Select(c => c.Value)
                    .SingleOrDefault()
                    ?.Split(',')
                    ??
                    Array.Empty<string>(),
                permissionIdAsText => int.TryParse(permissionIdAsText, out var permissionId) ? permissionId : -1);

            if (userPermissionsIds is null)
                return Task.CompletedTask;

            var isUserAuthorizedToPerformAction = requirement.PermissionIds.Intersect(userPermissionsIds).ToList().Count == requirement.PermissionIds.Length;

            if (isUserAuthorizedToPerformAction)
                context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}

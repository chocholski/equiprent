using Equiprent.Entities.EnumTypes;
using System.Security.Claims;

namespace Equiprent.Web.Authorization
{
    public class PermissionAuthorizationHandler : AuthorizationHandler<PermissionRequirement>
    {
        const string POLICY_NAME = "permission";

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.User is null)
            {
                await Task.CompletedTask;
                return;
            }

            var roles = context.User.Claims
                .Where(x => (x.Type.StartsWith(ClaimTypes.Role, StringComparison.OrdinalIgnoreCase)))
                .Select(x => x.Value)
                .SingleOrDefault();

            if (string.IsNullOrEmpty(roles))
            {
                await Task.CompletedTask;
                return;
            }

            if (requirement is null)
            {
                context.Succeed(requirement!);
                await Task.CompletedTask;
                return;
            }

            if (!requirement.PermissionIds.Any())
            {
                context.Succeed(requirement);
                await Task.CompletedTask;
                return;
            }

            if (requirement.PermissionIds.Contains((int)UserPermissionEnum.ForAllLoggedIn))
            {
                context.Succeed(requirement);
                await Task.CompletedTask;
                return;
            }

            var permissions = Array.ConvertAll(
                context.User.Claims
                    .Where(x => (x.Type.StartsWith(POLICY_NAME, StringComparison.OrdinalIgnoreCase)))
                    .Select(y => y.Value)
                    .SingleOrDefault()
                    ?.Split(',') ?? Array.Empty<string>(),
                permissionIdAsString => int.TryParse(permissionIdAsString, out var permissionId) ? permissionId : -1);

            if (permissions is null)
            {
                await Task.CompletedTask;
                return;
            }

            var userHasUserPermission = requirement.PermissionIds.Intersect(permissions).ToList().Count == requirement.PermissionIds.Length;

            if (userHasUserPermission)
            {
                context.Succeed(requirement);
                await Task.CompletedTask;
                return;
            }
        }
    }
}

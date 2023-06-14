using Equiprent.Data.DbContext;
using Equiprent.Web.Controllers;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Equiprent.Web.Authentication
{
    public class RefreshTokenActionFilterAttribute : ActionFilterAttribute
    {
        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (context.Controller is TokenController)
            {
                await base.OnActionExecutionAsync(context, next);

                return;
            }

            var dbContext = context.HttpContext
                 .RequestServices
                 .GetService(typeof(ApplicationDbContext)) as ApplicationDbContext;

            var nameIdentifier = context.HttpContext.User.FindFirst(y => y.Type == ClaimTypes.NameIdentifier);

            if (nameIdentifier is not null)
            {
                var currentUserId = Guid.TryParse(nameIdentifier.Value, out Guid gCurrentUserId) ? (Guid?)gCurrentUserId : null;

                if (currentUserId.HasValue &&
                    !await dbContext!.ApplicationUsers.AnyAsync(u => u.Id == currentUserId && u.IsTokenRefreshRequired))
                {
                    await base.OnActionExecutionAsync(context, next);
                }
                else
                    context.Result = (context.Controller as BaseApiController)!.Unauthorized();
            }
            else
                await base.OnActionExecutionAsync(context, next);
        }
    }
}

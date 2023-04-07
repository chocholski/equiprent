using System.Security.Claims;
using Equiprent.Entities.EnumTypes;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Equiprent.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RefreshTokenActionFilter]
    public class BaseApiController : ControllerBase
    {
        protected IConfiguration Configuration { get; }
        protected ApplicationDbContext? DbContext { get; }

        protected int CurrentUserId
        {
            get { return Convert.ToInt32(User.FindFirst(y => y.Type == ClaimTypes.NameIdentifier)?.Value); }
        }

        protected UserRoleEnum UserRole
        {
            get
            {
                return (UserRoleEnum)Enum.Parse(typeof(UserRoleEnum),
                    HttpContext.User.Claims.First(x => x.Type == ClaimTypes.Role).Value);
            }
        }

        public BaseApiController(ApplicationDbContext context, IConfiguration configuration)
        {
            DbContext = context;
            Configuration = configuration;
        }

        public BaseApiController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected ActionResult GetActionResult(CommandResult result, string? message = null)
        {
            if (string.IsNullOrEmpty(message))
            {
                return new JsonResult(result.ToString().Split('_')[1]);
            }
            return new JsonResult(message);
        }

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

                if (nameIdentifier != null)
                {
                    var currentUserId = Guid.TryParse(nameIdentifier.Value, out Guid gCurrentUserId) ? (Guid?)gCurrentUserId : null;

                    if (currentUserId.HasValue &&
                        !await dbContext!.ApplicationUsers.AnyAsync(x => x.Id == currentUserId && x.IsTokenRefreshRequired))
                    {
                        await base.OnActionExecutionAsync(context, next);
                    }
                    else
                    {
                        context.Result = (context.Controller as BaseApiController)!.Unauthorized();
                    }
                }
                else
                {
                    await base.OnActionExecutionAsync(context, next);
                }
            }
        }
    }
}


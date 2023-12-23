using System.Security.Claims;
using Equiprent.ApplicationImplementations.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RefreshTokenActionFilter]
    public class BaseApiController : ControllerBase
    {
        protected readonly IConfiguration _configuration;
        protected readonly ApplicationDbContext? _dbContext;

        protected int? CurrentUserId =>
            int.TryParse(User.FindFirst(y => y.Type == ClaimTypes.NameIdentifier)?.Value, out int userId) ? userId : null;

        protected UserRoleEnum? UserRole
        {
            get
            {
                var userRoleClaim = HttpContext.User.Claims
                    .FirstOrDefault(c => c.Type == ClaimTypes.Role);

                return userRoleClaim is not null &&
                    Enum.TryParse(userRoleClaim.Value, out UserRoleEnum userRole) 
                        ? userRole 
                        : null;
            }
        }

        public BaseApiController(ApplicationDbContext context, IConfiguration configuration)
        {
            _dbContext = context;
            _configuration = configuration;
        }

        public BaseApiController(IConfiguration configuration) => _configuration = configuration;

        protected ActionResult GetActionResult(CommandResult result, string? message = null)
        {
            if (string.IsNullOrEmpty(message))
            {
                var splitCommandResult = result.ToString().Split('_');

                message = splitCommandResult[splitCommandResult.Length > 1 ? 1 : 0];
            }

            return new JsonResult(message);
        }
    }
}


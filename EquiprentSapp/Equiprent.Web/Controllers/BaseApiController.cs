using System.Security.Claims;
using Equiprent.ApplicationInterfaces.CommandResults;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Web.Filters;
using MediatR;

namespace Equiprent.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [RefreshTokenActionFilter]
    public class BaseApiController : ControllerBase
    {
        protected readonly ApplicationDbContext? _dbContext;
        protected readonly ICommandResultService _commandResultService;
        protected readonly IConfiguration _configuration;
        protected readonly IMediator _mediator;

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

        public BaseApiController(
            ApplicationDbContext context,
            IServiceProvider serviceProvider) : this(serviceProvider)
        {
            _dbContext = context;
        }

        public BaseApiController(IServiceProvider serviceProvider)
        {
            _configuration = serviceProvider.GetRequiredService<IConfiguration>();
            _commandResultService = serviceProvider.GetRequiredService<ICommandResultService>();
            _mediator = serviceProvider.GetRequiredService<IMediator>();
        }

        protected ActionResult GetActionResult(CommandResult? result, string? message = null)
        {
            return new JsonResult(_commandResultService.GetActionResultFromCommandResult(result, message));
        }
    }
}


using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.UserRoles.Models;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Entities.EnumTypes;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Web.Controllers
{
    [PermissionAuthorize((int)UserPermissionEnum.UserRoles_CanList)]
    public class UserRoleController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public UserRoleController(ApplicationDbContext context, IConfiguration configuration, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
                  : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet]
        public async Task<ActionResult<ListModel>> GetUserRoles([FromQuery] RequestParameters sp)
        {
            var parameters = new GetPagedUserRolesMessage(sp);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUserRolesMessage, ListModel>(parameters);

            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRole(int id)
        {
            var parameters = new GetUserRoleByIdMessage(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserRoleByIdMessage, DetailsModel>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet("getUserPermissionsForRoleCreation")]
        public async Task<IActionResult> GetUserPermissionsForUserRoleCreation(int id)
        {
            var parameters = new GetUserPermissionsForUserRoleCreationMessage();
            var result = await _queryDispatcher.SendQueryAsync<GetUserPermissionsForUserRoleCreationMessage, UserPermissionsForUserRoleCreationModel>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionAuthorize((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPost]
        public async Task<IActionResult> SaveUserRole([FromBody] SaveMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPut]
        public async Task<IActionResult> CreateUserRole([FromBody] CreateMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRole(int id)
        {
            var message = new DeleteMessage(id);
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }
    }
}

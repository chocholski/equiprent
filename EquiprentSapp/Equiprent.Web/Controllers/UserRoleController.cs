using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.UserRoles.Models;
using Equiprent.Logic.Commands.UserRoles.Messages;
using Equiprent.Logic.Queries.UserRoles.Messages;
using Equiprent.Entities.EnumTypes;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;

namespace Equiprent.Web.Controllers
{
    [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanList)]
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
        public async Task<ActionResult<ListResponse>> GetUserRoles([FromQuery] RequestParameters sp)
        {
            var parameters = new GetPagedUserRolesRequest(sp);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUserRolesRequest, ListResponse>(parameters);

            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRole(int id)
        {
            var parameters = new GetUserRoleByIdRequest(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserRoleByIdRequest, DetailsResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet("getUserPermissionsForRoleCreation")]
        public async Task<IActionResult> GetUserPermissionsForUserRoleCreation(int id)
        {
            var parameters = new GetUserPermissionsForUserRoleCreationRequest();
            var result = await _queryDispatcher.SendQueryAsync<GetUserPermissionsForUserRoleCreationRequest, UserPermissionsForUserRoleCreationResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPost]
        public async Task<IActionResult> SaveUserRole([FromBody] SaveRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPut]
        public async Task<IActionResult> CreateUserRole([FromBody] CreateRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRole(int id)
        {
            var result = await _commandDispatcher.SendCommandAsync(new DeleteRequest(id));

            return GetActionResult(result);
        }
    }
}

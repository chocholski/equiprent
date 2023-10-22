using Equiprent.Entities.Enums;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.UserRoles.Requests.Create;
using Equiprent.Logic.Commands.UserRoles.Requests.Save;
using Equiprent.Logic.Commands.UserRoles.Requests.Delete;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRoleById;
using Equiprent.Logic.Queries.UserRoles.Responses.UserRolePermissionsForCreation;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanList)]
    public class UserRoleController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public UserRoleController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IQueryDispatcher queryDispatcher,
            ICommandDispatcher commandDispatcher)
                  : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet]
        public async Task<ActionResult<PagedUserRolesListResponse>> GetUserRoles([FromQuery] RequestParameters requestParameters)
        {
            var parameters = new GetPagedUserRolesListRequest(requestParameters);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUserRolesListRequest, PagedUserRolesListResponse>(parameters);

            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRole(int id)
        {
            var parameters = new GetUserRoleByIdRequest(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserRoleByIdRequest, UserRoleByIdResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet(ApiRoutes.UserRole.GetUserRolePermissionsForCreation)]
        public async Task<IActionResult> GetUserRolePermissionsForCreation()
        {
            var parameters = new GetUserRolePermissionsForCreationRequest();
            var result = await _queryDispatcher.SendQueryAsync<GetUserRolePermissionsForCreationRequest, UserRolePermissionsForCreationResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUserRole([FromBody] SaveRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPost]
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

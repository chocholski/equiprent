using Equiprent.Entities.Enums;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeLanguage;
using Equiprent.Logic.Commands.Users.Requests.ChangeRole;
using Equiprent.Logic.Commands.Users.Requests.Create;
using Equiprent.Logic.Commands.Users.Requests.Save;
using Equiprent.Logic.Commands.Users.Requests.Delete;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Logic.Queries.Users.Responses.PagedUsersList;
using Equiprent.Logic.Queries.Users.Responses.UserById;
using Equiprent.Logic.Queries.Users.Responses.UserLanguageById;
using Equiprent.Web.Contracts;
using Equiprent.Logic.Commands.Users.Requests.ChangeTheme;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class UserController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public UserController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IQueryDispatcher queryDispatcher,
            ICommandDispatcher commandDispatcher) : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedUsersListResponse>> GetPagedUsersList([FromQuery] RequestParameters requestParameters, [FromQuery] int? userRoleId)
        {
            var parameters = new GetPagedUsersListRequest(requestParameters, userRoleId);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUsersListRequest, PagedUsersListResponse>(parameters);

            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var parameters = new GetUserByIdRequest(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserByIdRequest, UserByIdResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet($"{ApiRoutes.User.GetLanguage}/{{userId}}")]
        public async Task<IActionResult> GetUserLanguageById(Guid userId)
        {
            var parameters = new GetUserLanguageByIdRequest(userId);
            var result = await _queryDispatcher.SendQueryAsync<GetUserLanguageByIdRequest, UserLanguageByIdResponse>(parameters);

            return new JsonResult(result);
        }

        [HttpGet($"{ApiRoutes.User.GetTheme}/{{userId}}")]
        public async Task<IActionResult> GetUserThemeById(Guid userId)
        {
            var parameters = new GetUserThemeByIdRequest(userId);
            var result = await _queryDispatcher.SendQueryAsync<GetUserThemeByIdRequest, bool>(parameters);

            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUser([FromBody] SaveRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [HttpPut(ApiRoutes.User.ChangeLanguage)]
        public async Task<IActionResult> ChangeLanguage([FromBody] ChangeLanguageRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost(ApiRoutes.User.ChangeRole)]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [HttpPost(ApiRoutes.User.ChangeTheme)]
        public async Task<IActionResult> ChangeTheme([FromBody] ChangeThemeRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _commandDispatcher.SendCommandAsync(new DeleteRequest(id));

            return GetActionResult(result);
        }
    }
}

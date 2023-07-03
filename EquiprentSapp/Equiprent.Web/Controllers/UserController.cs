using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Entities.EnumTypes;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Data.DbContext;

namespace Equiprent.Web.Controllers
{
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class UserController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;
        private readonly ICommandDispatcher _commandDispatcher;

        public UserController(ApplicationDbContext context, IConfiguration configuration, IQueryDispatcher queryDispatcher, ICommandDispatcher commandDispatcher)
                  : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet]
        public async Task<ActionResult<ListResponse>> GetUsersList([FromQuery] RequestParameters sp, [FromQuery] int? userRoleId)
        {
            var parameters = new GetPagedUsersRequest(sp, userRoleId);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUsersRequest, ListResponse>(parameters);

            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var parameters = new GetUserByIdRequest(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserByIdRequest, DetailsResponse>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet("getlanguage/{userId}")]
        public async Task<IActionResult> GetLanguage(Guid userId)
        {
            var parameters = new GetUserLanguageByIdRequest(userId);
            var result = await _queryDispatcher.SendQueryAsync<GetUserLanguageByIdRequest, LanguageResponse>(parameters);

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

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [HttpPut("changelanguage")]
        public async Task<IActionResult> ChangeLanguage([FromBody] ChangeLanguageRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);

            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost("changerole")]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
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

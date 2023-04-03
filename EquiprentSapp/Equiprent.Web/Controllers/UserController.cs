using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using Equiprent.Logic.Commands.Users.Messages;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Entities.EnumTypes;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Logic.Infrastructure.CQRS;

namespace Equiprent.Web.Controllers
{
    [PermissionAuthorize((int)UserPermissionEnum.ForAllLoggedIn)]
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

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanList)]
        [HttpGet]
        public async Task<ActionResult<ListModel>> GetUsersList([FromQuery] RequestParameters sp, [FromQuery] int? userRoleId)
        {
            var parameters = new GetPagedUsersMessage(sp, userRoleId);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedUsersMessage, ListModel>(parameters);

            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var parameters = new GetUserByIdMessage(id);
            var result = await _queryDispatcher.SendQueryAsync<GetUserByIdMessage, DetailsModel>(parameters);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet("getlanguage/{userId}")]
        public async Task<IActionResult> GetLanguage(int userId)
        {
            var parameters = new GetUserLanguageByIdMessage(userId);
            var result = await _queryDispatcher.SendQueryAsync<GetUserLanguageByIdMessage, LanguageModel>(parameters);

            return new JsonResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUser([FromBody] SaveMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [HttpPut("changelanguage")]
        public async Task<IActionResult> ChangeLanguage([FromBody] ChangeLanguageMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost("changerole")]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleMessage message)
        {
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var message = new DeleteMessage { Id = id };
            var result = await _commandDispatcher.SendCommandAsync(message);

            return GetActionResult(result);
        }
    }
}

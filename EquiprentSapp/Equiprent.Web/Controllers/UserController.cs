using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.Users.Requests.ChangeLanguage;
using Equiprent.Logic.Commands.Users.Requests.ChangeRole;
using Equiprent.Logic.Commands.Users.Requests.Create;
using Equiprent.Logic.Commands.Users.Requests.Save;
using Equiprent.Logic.Commands.Users.Requests.Delete;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.Users.Requests;
using Equiprent.Logic.Queries.Users.Responses.PagedUsersList;
using Equiprent.Web.Contracts;
using Equiprent.Logic.Commands.Users.Requests.ChangeTheme;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class UserController : BaseApiController
    {
        public UserController(ApplicationDbContext context, IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedUsersListResponse?>> GetPagedUsersList([FromQuery] RequestParameters requestParameters, [FromQuery] int? userRoleId)
        {
            var request = new GetPagedUsersListRequest(requestParameters, userRoleId);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var request = new GetUserByIdRequest(id);
            var result = await _mediator.Send(request);
            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet($"{ApiRoutes.User.GetLanguage}/{{userId}}")]
        public async Task<IActionResult> GetUserLanguageById(Guid userId)
        {
            var request = new GetUserLanguageByIdRequest(userId);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [HttpGet($"{ApiRoutes.User.GetTheme}/{{userId}}")]
        public async Task<IActionResult> GetUserThemeById(Guid userId)
        {
            var request = new GetUserThemeByIdRequest(userId);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUser([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [HttpPut(ApiRoutes.User.ChangeLanguage)]
        public async Task<IActionResult> ChangeLanguage([FromBody] ChangeLanguageRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpPost(ApiRoutes.User.ChangeRole)]
        public async Task<IActionResult> ChangeRole([FromBody] ChangeRoleRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [HttpPost(ApiRoutes.User.ChangeTheme)]
        public async Task<IActionResult> ChangeTheme([FromBody] ChangeThemeRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

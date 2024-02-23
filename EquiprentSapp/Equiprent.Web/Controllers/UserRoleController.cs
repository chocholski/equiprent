using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;
using Equiprent.Logic.Commands.UserRoles.Requests.Create;
using Equiprent.Logic.Commands.UserRoles.Requests.Save;
using Equiprent.Logic.Commands.UserRoles.Requests.Delete;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanList)]
    public class UserRoleController : BaseApiController
    {
        public UserRoleController(ApplicationDbContext context, IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [HttpGet]
        public async Task<ActionResult<PagedUserRolesListResponse?>> GetUserRolesAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedUserRolesListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserRoleAsync(int id)
        {
            var request = new GetUserRoleByIdRequest(id);
            var result = await _mediator.Send(request);

            return result is not null ? Ok(result) : NotFound();
        }

        [HttpGet(ApiRoutes.UserRole.GetUserRolePermissionsForCreation)]
        public async Task<IActionResult> GetUserRolePermissionsForCreationAsync()
        {
            var request = new GetUserRolePermissionsForCreationRequest();
            var result = await _mediator.Send(request);

            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUserRoleAsync([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateUserRoleAsync([FromBody] CreateRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.UserRoles_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserRoleAsync(int id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

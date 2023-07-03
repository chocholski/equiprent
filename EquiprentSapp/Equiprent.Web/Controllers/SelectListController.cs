using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Messages;
using Equiprent.Entities.EnumTypes;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Web.Controllers
{
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class SelectListController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;

        public SelectListController(IConfiguration configuration, IQueryDispatcher queryDispatcher) : base(configuration)
        {
            _queryDispatcher = queryDispatcher;
        }

        [HttpGet("getusers")]
        public async Task<ActionResult<Logic.Queries.Users.Models.SelectListResponse>> GetUsersList([FromQuery] RequestParameters sp, [FromQuery] int[] roleIds, [FromQuery] Guid[] ignoredUserIds)
        {
            var parameters = new GetPagedSelectUsersRequest(sp, ignoredUserIds);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedSelectUsersRequest, Logic.Queries.Users.Models.SelectListResponse>(parameters);

            return new JsonResult(result);
        }
    }
}
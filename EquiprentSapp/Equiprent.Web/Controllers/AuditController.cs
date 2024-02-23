using Equiprent.Data.DbContext;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.Audits.Requests;
using Equiprent.Entities.Enums;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class AuditController : BaseApiController
    {
        public AuditController(ApplicationDbContext context, IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectHistoryAsync([FromQuery]RequestParameters requestParameters, string entityId, string entityTableName)
        {
            var request = new GetObjectHistoryRequest(requestParameters, entityId, entityTableName);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [HttpGet(ApiRoutes.Audit.GetFieldNames)]
        public async Task<ActionResult> GetFieldNamesAsync([FromQuery]RequestParameters requestParameters, string entityId, string entityTableName)
        {
            var request = new GetFieldNamesRequest(requestParameters, entityId, entityTableName);
            var result = await _mediator.Send(request);
            return new JsonResult(result?.List);
        }
    }
}
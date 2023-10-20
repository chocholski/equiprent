using Equiprent.Data.DbContext;
using Equiprent.Web.Filters;
using Equiprent.Logic.Queries.Audits.Requests;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class AuditController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;

        public AuditController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IQueryDispatcher queryDispatcher) : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectHistory([FromQuery]RequestParameters requestParameters, string entityId, string entityTableName)
        {
            var request = new GetObjectHistoryRequest(requestParameters, entityId, entityTableName);
            var result = await _queryDispatcher.SendQueryAsync<GetObjectHistoryRequest, ObjectHistoryResponse>(request);

            return new JsonResult(result);
        }

        [HttpGet(ApiRoutes.Audit.GetFieldNames)]
        public async Task<ActionResult> GetFieldNames([FromQuery]RequestParameters requestParameters, string entityId, string entityTableName)
        {
            var request = new GetFieldNamesRequest(requestParameters, entityId, entityTableName);
            var result = await _queryDispatcher.SendQueryAsync<GetFieldNamesRequest, FieldNamesResponse>(request);

            return new JsonResult(result?.List);
        }
    }
}
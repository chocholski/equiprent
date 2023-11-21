using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using Equiprent.Web.Filters;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.Clients_CanList)]
    public class ClientController : BaseApiController
    {
        private readonly ICommandDispatcher _commandDispatcher;
        private readonly IQueryDispatcher _queryDispatcher;

        public ClientController(
            ApplicationDbContext context,
            IConfiguration configuration,
            ICommandDispatcher commandDispatcher,
            IQueryDispatcher queryDispatcher) : base(context, configuration)
        {
            _queryDispatcher = queryDispatcher;
            _commandDispatcher = commandDispatcher;
        }

        [HttpGet]
        public async Task<ActionResult<PagedClientsListResponse>> GetPagedClientsList([FromQuery] RequestParameters requestParameters)
        {
            var parameters = new GetPagedClientsListRequest(requestParameters);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedClientsListRequest, PagedClientsListResponse>(parameters);

            return new JsonResult(result);
        }
    }
}

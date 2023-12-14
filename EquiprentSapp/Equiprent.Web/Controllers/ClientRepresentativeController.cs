using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet(ApiRoutes.Client.Representative.GetAll)]
        public async Task<ActionResult<PagedClientRepresentativesListResponse>> GetPagedClientRepresentativesList([FromQuery] RequestParameters requestParameters, [FromQuery] Guid clientId)
        {
            var parameters = new GetPagedClientRepresentativesListRequest(requestParameters, clientId);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedClientRepresentativesListRequest, PagedClientRepresentativesListResponse>(parameters);
            return new JsonResult(result);
        }
    }
}

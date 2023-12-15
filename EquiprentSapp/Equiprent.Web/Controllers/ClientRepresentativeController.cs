using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientRepresentativesList;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    public partial class ClientController
    {
        [PermissionRequirement(
            (int)UserPermissionEnum.Clients_CanList,
            (int)UserPermissionEnum.Clients_CanModify,
            (int)UserPermissionEnum.ClientRepresentatives_CanList)]
        [HttpGet(ApiRoutes.Client.Representative.GetAll)]
        public async Task<ActionResult<PagedClientRepresentativesListResponse>> GetPagedClientRepresentativesList([FromQuery] RequestParameters requestParameters, [FromQuery] Guid clientId)
        {
            var parameters = new GetPagedClientRepresentativesListRequest(requestParameters, clientId);
            var result = await _queryDispatcher.SendQueryAsync<GetPagedClientRepresentativesListRequest, PagedClientRepresentativesListResponse>(parameters);
            return new JsonResult(result);
        }

        [PermissionRequirement(
            (int)UserPermissionEnum.Clients_CanList,
            (int)UserPermissionEnum.Clients_CanModify,
            (int)UserPermissionEnum.ClientRepresentatives_CanList,
            (int)UserPermissionEnum.ClientRepresentatives_CanModify)]
        [HttpPost(ApiRoutes.Client.Representative.Post)]
        public async Task<IActionResult> CreateClientRepresentative([FromBody] CreateRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);
            return GetActionResult(result);
        }
    }
}

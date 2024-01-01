using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.CreateClientRepresentative;
using Equiprent.Logic.Commands.Clients.Requests.DeleteClientRepresentative;
using Equiprent.Logic.Commands.Clients.Requests.SaveClientRepresentative;
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
            var request = new GetPagedClientRepresentativesListRequest(requestParameters, clientId);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [PermissionRequirement(
            (int)UserPermissionEnum.Clients_CanList,
            (int)UserPermissionEnum.Clients_CanModify,
            (int)UserPermissionEnum.ClientRepresentatives_CanList)]
        [HttpGet(ApiRoutes.Client.Representative.GetById)]
        public async Task<IActionResult> GetClientRepresentativeById(Guid id)
        {
            var request = new GetClientRepresentativeByIdRequest(id);
            var result = await _mediator.Send(request);
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
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement(
            (int)UserPermissionEnum.Clients_CanList,
            (int)UserPermissionEnum.Clients_CanModify,
            (int)UserPermissionEnum.ClientRepresentatives_CanList,
            (int)UserPermissionEnum.ClientRepresentatives_CanModify)]
        [HttpPut(ApiRoutes.Client.Representative.Put)]
        public async Task<IActionResult> SaveClientRepresentative([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement(
            (int)UserPermissionEnum.Clients_CanList,
            (int)UserPermissionEnum.Clients_CanModify,
            (int)UserPermissionEnum.ClientRepresentatives_CanList,
            (int)UserPermissionEnum.ClientRepresentatives_CanModify)]
        [HttpDelete(ApiRoutes.Client.Representative.Delete)]
        public async Task<IActionResult> DeleteClientRepresentative(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

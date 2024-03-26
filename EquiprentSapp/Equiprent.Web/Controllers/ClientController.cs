﻿using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.Commands.Clients.Requests.Delete;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList;
using Equiprent.Web.Contracts;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public partial class ClientController : BaseApiController
    {
        public ClientController(
            ApplicationDbContext context,
            IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedClientsListResponse>> GetPagedClientsListAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedClientsListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [HttpGet(ApiRoutes.Client.Selection)]
        public async Task<ActionResult<PagedClientsSelectionListResponse?>> GetPagedClientsSelectionListAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedClientsSelectionListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientByIdAsync(Guid id)
        {
            var request = new GetClientByIdRequest(id);
            var result = await _mediator.Send(request);
            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateClientAsync([FromBody] CreateRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveClientAsync([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientAsync(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

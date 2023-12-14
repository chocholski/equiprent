﻿using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Clients.Requests.Create;
using Equiprent.Logic.Commands.Clients.Requests.Delete;
using Equiprent.Logic.Commands.Clients.Requests.Save;
using Equiprent.Logic.Infrastructure.CQRS;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.ClientById;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using Equiprent.Web.Filters;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.Clients_CanList)]
    public partial class ClientController : BaseApiController
    {
        protected readonly ICommandDispatcher _commandDispatcher;
        protected readonly IQueryDispatcher _queryDispatcher;

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

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(Guid id)
        {
            var parameters = new GetClientByIdRequest(id);
            var result = await _queryDispatcher.SendQueryAsync<GetClientByIdRequest, ClientByIdResponse>(parameters);
            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] CreateRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveClient([FromBody] SaveRequest request)
        {
            var result = await _commandDispatcher.SendCommandAsync(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Clients_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(Guid id)
        {
            var result = await _commandDispatcher.SendCommandAsync(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

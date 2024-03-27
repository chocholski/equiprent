using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Equipments.Requests.Create;
using Equiprent.Logic.Commands.Equipments.Requests.Delete;
using Equiprent.Logic.Commands.Equipments.Requests.Save;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsSelectionList;
using Equiprent.Web.Contracts;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public partial class EquipmentController : BaseApiController
    {
        public EquipmentController(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedEquipmentsListResponse?>> GetPagedEquipmentsListAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedEquipmentsListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [HttpGet(ApiRoutes.Equipment.Selection)]
        public async Task<ActionResult<PagedEquipmentsSelectionListResponse?>> GetPagedEquipmentsSelectionListAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedEquipmentsSelectionListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipmentByIdAsync(Guid id)
        {
            var request = new GetEquipmentByIdRequest(id);
            var result = await _mediator.Send(request);
            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateEquipmentAsync([FromBody] CreateRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveEquipmentAsync([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipmentAsync(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

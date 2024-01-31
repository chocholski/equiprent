using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class EquipmentController : BaseApiController
    {
        public EquipmentController(ApplicationDbContext dbContext, IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Equipments_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedEquipmentsListResponse?>> GetPagedEquipmentsList([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedEquipmentsListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }
    }
}

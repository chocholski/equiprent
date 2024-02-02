using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Queries.Manufacturers.Requests;
using Equiprent.Logic.Queries.Manufacturers.Responses.PagedManufacturersList;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class ManufacturerController : BaseApiController
    {
        public ManufacturerController(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider) : base(dbContext, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Manufacturers_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedManufacturersListResponse?>> GetPagedManufacturersList([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedManufacturersListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }
    }
}

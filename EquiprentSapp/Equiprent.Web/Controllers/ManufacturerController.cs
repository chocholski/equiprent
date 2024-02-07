using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Commands.Manufacturers.Requests.Create;
using Equiprent.Logic.Commands.Manufacturers.Requests.Delete;
using Equiprent.Logic.Commands.Manufacturers.Requests.Save;
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

        [PermissionRequirement((int)UserPermissionEnum.Manufacturers_CanList)]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetManufacturerByIdAsync(Guid id)
        {
            var request = new GetManufacturerByIdRequest(id);
            var result = await _mediator.Send(request);
            return result is not null ? Ok(result) : NotFound();
        }

        [PermissionRequirement((int)UserPermissionEnum.Manufacturers_CanModify)]
        [HttpPost]
        public async Task<IActionResult> CreateManufacturerAsync([FromBody] CreateRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Manufacturers_CanModify)]
        [HttpPut]
        public async Task<IActionResult> SaveUser([FromBody] SaveRequest request)
        {
            var result = await _mediator.Send(request);
            return GetActionResult(result);
        }

        [PermissionRequirement((int)UserPermissionEnum.Manufacturers_CanModify)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var result = await _mediator.Send(new DeleteRequest(id));
            return GetActionResult(result);
        }
    }
}

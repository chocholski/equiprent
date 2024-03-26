using Equiprent.Data.DbContext;
using Equiprent.Entities.Enums;
using Equiprent.Logic.Queries.Rentals.Requests;
using Equiprent.Logic.Queries.Rentals.Responses.PagedRentalsList;

namespace Equiprent.Web.Controllers
{
    public class RentalController : BaseApiController
    {
        public RentalController(ApplicationDbContext context, IServiceProvider serviceProvider) : base(context, serviceProvider)
        {
        }

        [PermissionRequirement((int)UserPermissionEnum.Rentals_CanList)]
        [HttpGet]
        public async Task<ActionResult<PagedRentalsListResponse?>> GetPagedRentalsListAsync([FromQuery] RequestParameters requestParameters)
        {
            var request = new GetPagedRentalsListRequest(requestParameters);
            var result = await _mediator.Send(request);
            return new JsonResult(result);
        }
    }
}

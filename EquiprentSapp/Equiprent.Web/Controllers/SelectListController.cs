using Equiprent.Entities.Enums;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class SelectListController : BaseApiController
    {
        private readonly IQueryDispatcher _queryDispatcher;

        public SelectListController(
            IConfiguration configuration,
            IQueryDispatcher queryDispatcher) : base(configuration)
        {
            _queryDispatcher = queryDispatcher;
        }
    }
}
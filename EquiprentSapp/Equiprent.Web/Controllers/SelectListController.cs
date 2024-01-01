using Equiprent.Entities.Enums;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class SelectListController : BaseApiController
    {
        public SelectListController(IServiceProvider serviceProvider) : base(serviceProvider)
        {
        }
    }
}
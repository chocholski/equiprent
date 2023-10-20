using Equiprent.Logic.QueryData.UIModels;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Entities.Application;
using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;
using Equiprent.Web.Contracts;

namespace Equiprent.Web.Controllers
{
    public class SelectOptionsController : BaseApiController
    {
        private readonly ILanguageableService _languageableService;
        
        public SelectOptionsController(ApplicationDbContext context, IConfiguration configuration, ILanguageableService languageableService) : base(context, configuration)
        {
            _languageableService = languageableService;
        }

        [HttpGet(ApiRoutes.SelectOptions.Languages)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetLanguagesSelectOptions()
        {
            var languages = await _dbContext!.Languages
                .ToListAsync();

            var model = languages
                .Select(language => new SelectListItemModel
                {
                    Value = language.Id.ToString(),
                    Name = language.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet(ApiRoutes.SelectOptions.UserRoles)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetUserRolesSelectOptions()
        {
            var userRolesIdsWithNames = await _languageableService.GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>();
            var model = userRolesIdsWithNames
                .Select(userRoleIdWithName => new SelectListItemModel
                {
                    Value = userRoleIdWithName.Id.ToString(),
                    Name = userRoleIdWithName.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
        [HttpGet(ApiRoutes.SelectOptions.YesNoOptions)]
        public ActionResult<IEnumerable<SelectListItemModel>> GetYesNoSelectOptions()
        {
            var model = new List<SelectListItemModel>
            {
                new SelectListItemModel { Value = 0.ToString(), Name = "Nie" },
                new SelectListItemModel { Value = 1.ToString(), Name = "Tak" }
            };

            return new JsonResult(model, new JsonSerializerSettings { });
        }
    }
}
using Equiprent.Logic.QueryData.UIModels;
using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;
using Equiprent.Web.Contracts;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Entities.Business.CountryToLanguages;

namespace Equiprent.Web.Controllers
{
    public class SelectOptionsController : BaseApiController
    {
        private readonly ILanguageableService _languageableService;
        
        public SelectOptionsController(
            ApplicationDbContext context,
            IServiceProvider serviceProvider,
            ILanguageableService languageableService) : base(context, serviceProvider)
        {
            _languageableService = languageableService;
        }

        [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
        [HttpGet(ApiRoutes.SelectOptions.ClientTypes)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetClientTypesSelectOptions()
        {
            var clientTypesTranslations = await _languageableService.GetEntityTranslationsInCurrentUserLanguageAsync<ClientTypeToLanguage>();

            var model = clientTypesTranslations
                .Select(clientTypeIdWithName => new SelectListItemModel
                {
                    Value = clientTypeIdWithName.Id.ToString(),
                    Name = clientTypeIdWithName.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [HttpGet(ApiRoutes.SelectOptions.Countries)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetCountriesSelectOptions()
        {
            var countriesTranslations = await _languageableService.GetEntityTranslationsInCurrentUserLanguageAsync<CountryToLanguage>();
            var model = countriesTranslations
                .Select(c => new SelectListItemModel
                {
                    Value = c.Id.ToString(),
                    Name = c.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
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
            var userRolesTranslations = await _languageableService.GetEntityTranslationsInCurrentUserLanguageAsync<UserRoleToLanguage>();
            var model = userRolesTranslations
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
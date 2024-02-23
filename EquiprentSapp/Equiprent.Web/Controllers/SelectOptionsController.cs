using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;
using Equiprent.Web.Contracts;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Entities.Business.CountryToLanguages;
using Equiprent.Entities.Business.EquipmentTypeToLanguages;
using Equiprent.Logic.GeneralModels;

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
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetClientTypesSelectOptionsAsync()
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
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetCountriesSelectOptionsAsync()
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

        [HttpGet(ApiRoutes.SelectOptions.EquipmentTypes)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetEquipmentTypesSelectOptionsAsync()
        {
            var equipmentTypesTranslations = await _languageableService.GetEntityTranslationsInCurrentUserLanguageAsync<EquipmentTypeToLanguage>();
            var model = equipmentTypesTranslations
                .Select(type => new SelectListItemModel
                {
                    Value = type.Id.ToString(),
                    Name = type.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [HttpGet(ApiRoutes.SelectOptions.Languages)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetLanguagesSelectOptionsAsync()
        {
            var model = await _dbContext!.Languages
                .Select(language => new SelectListItemModel
                {
                    Value = language.Id.ToString(),
                    Name = language.Name
                })
                .ToListAsync();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [HttpGet(ApiRoutes.SelectOptions.Manufacturers)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetManufacturersSelectOptionsAsync()
        {
            var model = await _dbContext!.Manufacturers
                .Where(m => !m.IsDeleted)
                .Select(m => new SelectListItemModel
                {
                    Value = m.Id.ToString(),
                    Name = m.Name,
                })
                .ToListAsync();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet(ApiRoutes.SelectOptions.UserRoles)]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetUserRolesSelectOptionsAsync()
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
        public ActionResult<IEnumerable<SelectListItemModel>> GetYesNoSelectOptionsAsync()
        {
            var model = new List<SelectListItemModel>
            {
                new() { Value = 0.ToString(), Name = "Nie" },
                new() { Value = 1.ToString(), Name = "Tak" }
            };

            return new JsonResult(model, new JsonSerializerSettings { });
        }
    }
}
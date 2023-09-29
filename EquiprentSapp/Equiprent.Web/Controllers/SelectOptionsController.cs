using Equiprent.Logic.QueryData.UIModels;
using Equiprent.ApplicationServices.Languageables;
using Equiprent.Entities.Application;
using Equiprent.Entities.Enums;
using Equiprent.Data.DbContext;

namespace Equiprent.Web.Controllers
{
    public class SelectOptionsController : BaseApiController
    {
        private readonly ILanguageableService _languageableService;
        
        public SelectOptionsController(ApplicationDbContext context, IConfiguration configuration, ILanguageableService languageableService) : base(context, configuration)
        {
            _languageableService = languageableService;
        }

        [PermissionRequirement((int)UserPermissionEnum.Users_CanList)]
        [HttpGet("userrolesselectoptions")]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetUserRolesSelectOptions()
        {
            var userRolesIdsWithNames = await _languageableService.GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>();
            var model = userRolesIdsWithNames
                .Select(userRoleIdWithName => new SelectListItemModel
                {
                    Value = userRoleIdWithName.Id,
                    Name = userRoleIdWithName.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
        [HttpGet("yesnoselectoptions")]
        public ActionResult<IEnumerable<SelectListItemModel>> GetYesNoSelectOptions()
        {
            var model = new List<SelectListItemModel>
            {
                new SelectListItemModel { Value = 0, Name = "Nie" },
                new SelectListItemModel { Value = 1, Name = "Tak" }
            };

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        
        [HttpGet("languagesselectoptions")]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetLanguagesSelectOptions()
        {
            var languages = await _dbContext!.Languages
                .ToListAsync();

            var model = languages
                .Select(language => new SelectListItemModel
                {
                    Value = language.Id,
                    Name = language.Name
                })
                .ToList();

            return new JsonResult(model, new JsonSerializerSettings { });
        }
    }
}
using Equiprent.Logic.QueryData.UIModels;
using Equiprent.ApplicationServices.Languageable;
using Equiprent.Entities.Application;
using Equiprent.Entities.EnumTypes;

namespace Equiprent.Web.Controllers
{
    public class SelectOptionsController : BaseApiController
    {
        private readonly ILanguageableService _languageableService;
        
        public SelectOptionsController(ApplicationDbContext context, IConfiguration configuration, ILanguageableService languageableService) : base(context, configuration)
        {
            _languageableService = languageableService;
        }

        [PermissionAuthorize((int)UserPermissionEnum.Users_CanList)]
        [HttpGet("userrolesselectoptions")]
        public async Task<ActionResult<IEnumerable<SelectListItemModel>>> GetUserRolesSelectOptions()
        {
            var model = new List<SelectListItemModel>();
            var userRolesIdsWithNames = await _languageableService.GetEntityIdsWithNamesInCurrentUserLanguageAsync<UserRoleToLanguage>();
            var userRoles = userRolesIdsWithNames
                .Select(userRoleIdWithName => new SelectListItemModel
                {
                    Value = userRoleIdWithName.Id,
                    Name = userRoleIdWithName.Name
                })
                .ToList();

            model.AddRange(userRoles);

            return new JsonResult(model, new JsonSerializerSettings { });
        }

        [PermissionAuthorize((int)UserPermissionEnum.ForAllLoggedIn)]
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
            var languages = await DbContext!.Languages
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
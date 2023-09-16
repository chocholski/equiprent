using Equiprent.Data.CustomQueries;
using Equiprent.Logic.QueryData.Audits;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.ApplicationServices.Audits;
using Equiprent.Entities.EnumTypes;
using Equiprent.Data.DbContext;
using Equiprent.Web.Filters;
using Equiprent.Data.CustomQueryTypes;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class AuditController : BaseApiController
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public AuditController(
            ApplicationDbContext context,
            IConfiguration configuration,
            IAuditMemberTranslatorService auditMemberTranslatorService) : base(context, configuration)
        {
            _auditMemberTranslatorService = auditMemberTranslatorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectHistory([FromQuery]RequestParameters sp, string entityId, string entityTableName)
        {
            if (string.IsNullOrEmpty(sp.SortColumnName) || sp.SortColumnName is "null")
                sp.SortColumnName = "CreatedOn";

            var model = await ListViewModelBuilder.GetListViewModelAsync<AuditListViewModel, AuditListQueryModel, AuditListItemViewModel>(
                query: _dbContext!.AuditListItems.FromSqlRaw(AuditQueries.GetAudit(entityId, entityTableName)),
                requestParameters: sp);

            return new JsonResult(model);
        }

        [HttpGet("getfieldnames")]
        public async Task<ActionResult> GetFieldNames(string entityId, string entityTableName)
        {
            var result = new List<AuditTranslationItemViewModel>();
            var auditEntries = await _dbContext!.AuditListItems
                .FromSqlRaw(AuditQueries.GetAudit(entityId, entityTableName))
                .ToListAsync();

            foreach (var entry in auditEntries)
            {
                if (result.All(x => x.DbName != entry.FieldName))
                {
                    result.Add(new AuditTranslationItemViewModel
                    {
                        Translation = _auditMemberTranslatorService.Translate(entry.FieldName),
                        DbName = entry.FieldName
                    });
                }
            }

            return new JsonResult(result);
        }
    }
}
using Equiprent.Data.CustomQueries;
using Equiprent.Logic.QueryData.Audits;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.ApplicationServices.Audits;
using Equiprent.Entities.EnumTypes;
using Equiprent.Data.DbContext;
using Equiprent.Web.Filters;

namespace Equiprent.Web.Controllers
{
    [ApiKeyFilter]
    [PermissionRequirement((int)UserPermissionEnum.ForAllLoggedIn)]
    public class AuditController : BaseApiController
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public AuditController(ApplicationDbContext context, IConfiguration configuration, IAuditMemberTranslatorService auditMemberTranslatorService) : base(context, configuration)
        {
            _auditMemberTranslatorService = auditMemberTranslatorService;
        }

        [HttpGet]
        public async Task<IActionResult> GetObjectHistory([FromQuery]RequestParameters sp, string entityId, string entityTableName)
        {
            if (string.IsNullOrEmpty(sp.SortColumnName) || sp.SortColumnName == "null")
                sp.SortColumnName = "CreatedOn";

            var auditEntries = await _dbContext!.AuditListItems.FromSqlRaw(AuditQueries.GetAudit(entityId, entityTableName))
                .Where(DbStatementBuilder.BuildWhereClause(sp.SearchCriteria ?? string.Empty))
                .OrderBy(DbStatementBuilder.BuildOrderClause(sp.SortColumnName, sp.SortOrder))
                .Skip(sp.StartRow)
                .Take(sp.PageCount)
                .ToListAsync();

            var model = new AuditListViewModel();

            foreach (var entry in auditEntries)
            {
                var item = new AuditListItemModel
                {
                    CreatedOn = entry.CreatedOn,
                    UserName = entry.UserName,
                    FieldName = entry.FieldName,
                    Translation = _auditMemberTranslatorService.Translate(entry.FieldName),
                    OldValue = entry.OldValue,
                    NewValue = entry.NewValue
                };

                model.List.Add(item);
            }

            model.TotalRowsCount = await _dbContext.AuditListItems
                .FromSqlRaw(AuditQueries.GetAudit(entityId, entityTableName))
                .Where(DbStatementBuilder.BuildWhereClause(sp.SearchCriteria ?? string.Empty))
                .CountAsync();

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
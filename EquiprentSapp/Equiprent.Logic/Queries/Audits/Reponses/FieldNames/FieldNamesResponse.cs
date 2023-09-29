using Equiprent.ApplicationServices.Audits;
using Equiprent.ApplicationServices.Database;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.Audits.Reponses.FieldNames
{
    public class FieldNamesResponse : ListViewModelBaseResponse<AuditListQueryModel, FieldNamesItemViewModel>
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public FieldNamesResponse(
            RequestParameters requestParameters,
            IAuditMemberTranslatorService auditMemberTranslatorService,
            IDbStatementService dbStatementService,
            IQueryable<AuditListQueryModel> query) : base(requestParameters, dbStatementService, query)
        {
            _auditMemberTranslatorService = auditMemberTranslatorService;
        }

        protected override async Task<FieldNamesItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity)
        {
            return await Task.FromResult(new FieldNamesItemViewModel
            {
                Translation = _auditMemberTranslatorService.Translate(entity.FieldName),
                DbName = entity.FieldName
            });
        }
    }
}

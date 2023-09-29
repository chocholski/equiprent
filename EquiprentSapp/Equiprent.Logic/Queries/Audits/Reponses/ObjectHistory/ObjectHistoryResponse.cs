using Equiprent.ApplicationServices.Audits;
using Equiprent.ApplicationServices.Database;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory
{
    public class ObjectHistoryResponse : ListViewModelBaseResponse<AuditListQueryModel, ObjectHistoryItemViewModel>
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public ObjectHistoryResponse(
            RequestParameters requestParameters,
            IAuditMemberTranslatorService auditMemberTranslatorService,
            IDbStatementService dbStatementService,
            IQueryable<AuditListQueryModel> query) : base(requestParameters, dbStatementService, query)
        {
            _auditMemberTranslatorService = auditMemberTranslatorService;
        }

        protected override async Task<ObjectHistoryItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity) =>
            await Task.FromResult(new ObjectHistoryItemViewModel
            {
                CreatedOn = entity.CreatedOn,
                UserName = entity.UserName,
                FieldName = entity.FieldName,
                Translation = _auditMemberTranslatorService.Translate(entity.FieldName),
                OldValue = entity.OldValue,
                NewValue = entity.NewValue
            });
    }
}

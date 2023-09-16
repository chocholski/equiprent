using Equiprent.ApplicationServices.Audits;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Logic.Abstractions;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;

namespace Equiprent.Logic.QueryData.Audits
{
    public sealed class AuditListViewModel : ListViewModelBase<AuditListQueryModel, AuditListItemViewModel>
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public AuditListViewModel(
            IQueryable<AuditListQueryModel> query,
            RequestParameters requestParameters,
            IAuditMemberTranslatorService auditMemberTranslatorService) : base(query, requestParameters)
        {
            _auditMemberTranslatorService = auditMemberTranslatorService;
        }

        protected override async Task<AuditListItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity) =>
            await Task.FromResult(new AuditListItemViewModel
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

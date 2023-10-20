using Equiprent.ApplicationServices.Audits;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Logic.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Equiprent.Logic.Queries.Audits.Reponses.FieldNames
{
    public class FieldNamesResponse : ListViewModelBaseResponse<AuditListQueryModel, FieldNamesItemViewModel>
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public FieldNamesResponse(
            RequestParameters requestParameters,
            IQueryable<AuditListQueryModel> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
            _auditMemberTranslatorService = serviceProvider.GetService<IAuditMemberTranslatorService>()!;
        }

        protected override async Task<FieldNamesItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity)
        {
            return await Task.FromResult(new FieldNamesItemViewModel
            {
                Name = _auditMemberTranslatorService!.Translate(entity.FieldName),
                Value = entity.FieldName
            });
        }
    }
}

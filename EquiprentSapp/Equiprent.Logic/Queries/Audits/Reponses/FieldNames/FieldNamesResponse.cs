using Equiprent.ApplicationInterfaces.Audits.AuditMemberTranslators;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Logic.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

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

        protected override async Task<FieldNamesItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity, CancellationToken cancellationToken = default)
        {
            return await Task.FromResult(new FieldNamesItemViewModel
            {
                Name = _auditMemberTranslatorService!.Translate(entity.FieldName),
                Value = entity.FieldName
            });
        }
    }
}

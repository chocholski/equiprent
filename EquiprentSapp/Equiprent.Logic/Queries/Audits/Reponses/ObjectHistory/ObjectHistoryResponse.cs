﻿using Equiprent.ApplicationServices.Audits;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Logic.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory
{
    public class ObjectHistoryResponse : ListViewModelBaseResponse<AuditListQueryModel, ObjectHistoryItemViewModel>
    {
        private readonly IAuditMemberTranslatorService _auditMemberTranslatorService;

        public ObjectHistoryResponse(
            RequestParameters requestParameters,
            IQueryable<AuditListQueryModel> query,
            IServiceProvider serviceProvider) : base(requestParameters, query, serviceProvider)
        {
            _auditMemberTranslatorService = serviceProvider.GetService<IAuditMemberTranslatorService>()!;
        }

        protected override async Task<ObjectHistoryItemViewModel> MapEntityToViewModelAsync(AuditListQueryModel entity)
        {
            return await Task.FromResult(new ObjectHistoryItemViewModel
            {
                CreatedOn = entity.CreatedOn,
                FieldName = entity.FieldName,
                NewValue = entity.NewValue,
                OldValue = entity.OldValue,
                Translation = _auditMemberTranslatorService.Translate(entity.FieldName),
                UserName = entity.UserName,
            });
        }
    }
}

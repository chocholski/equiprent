using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.CustomQueries;
using Equiprent.Data.CustomQueries.Queries.Equipments;
using Equiprent.Data.CustomQueries.Queries.Equipments.Requests;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.EquipmentTypeToLanguages;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.PagedEquipmentsList
{
    public class GetPagedEquipmentsListHandler : IRequestHandler<GetPagedEquipmentsListRequest, PagedEquipmentsListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IMediator _mediator;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedEquipmentsListHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
            _languageableService = serviceProvider.GetRequiredService<ILanguageableService>();
            _mediator = serviceProvider.GetRequiredService<IMediator>();
        }

        public async Task<PagedEquipmentsListResponse?> Handle(GetPagedEquipmentsListRequest request, CancellationToken cancellationToken = default)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedEquipmentsListResponse, EquipmentListQueryModel, EquipmentListQueryModel, EquipmentListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: await GetEquipmentsQueryAsync(),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<EquipmentListItemViewModel, EquipmentTypeToLanguage>(
                    response.List,
                    idPropertyName: nameof(EquipmentListItemViewModel.TypeId),
                    namePropertyName: nameof(EquipmentListItemViewModel.TypeName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private async Task<IQueryable<EquipmentListQueryModel>> GetEquipmentsQueryAsync()
        {
            return _dbContext.EquipmentListItems
                .FromSqlRaw(await _mediator.Send(new GetEquipmentListQueryRequest(_dbContext)));
        }
    }
}

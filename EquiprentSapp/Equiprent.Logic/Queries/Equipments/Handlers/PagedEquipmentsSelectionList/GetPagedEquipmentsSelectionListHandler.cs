using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.CustomQueries.Queries.Equipments.Requests;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Equipments.Types.TypeToLanguages;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsSelectionList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers.PagedEquipmentsSelectionList
{
    public class GetPagedEquipmentsSelectionListHandler : IRequestHandler<GetPagedEquipmentsSelectionListRequest, PagedEquipmentsSelectionListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IMediator _mediator;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedEquipmentsSelectionListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IMediator mediator,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _mediator = mediator;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedEquipmentsSelectionListResponse?> Handle(GetPagedEquipmentsSelectionListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedEquipmentsSelectionListResponse, EquipmentSelectionListQueryModel, EquipmentSelectionListQueryModel, EquipmentSelectionListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: await GetEquipmentsSelectionQueryAsync(),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<EquipmentSelectionListItemViewModel, EquipmentTypeToLanguage>(
                    response.List,
                    idPropertyName: nameof(EquipmentSelectionListItemViewModel.TypeId),
                    namePropertyName: nameof(EquipmentSelectionListItemViewModel.TypeName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private async Task<IQueryable<EquipmentSelectionListQueryModel>> GetEquipmentsSelectionQueryAsync()
        {
            return _dbContext.EquipmentSelectionListItems
                .FromSqlRaw(await _mediator.Send(new GetEquipmentSelectionListQueryRequest(_dbContext)));
        }
    }
}

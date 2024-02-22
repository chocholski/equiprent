using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.CustomQueries.Equipments;
using Equiprent.Data.CustomQueryTypes.Equipments;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.EquipmentTypeToLanguages;
using Equiprent.Logic.Queries.Equipments.Requests;
using Equiprent.Logic.Queries.Equipments.Responses.PagedEquipmentsList;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Equiprent.Logic.Queries.Equipments.Handlers
{
    public class GetPagedEquipmentsListHandler : IRequestHandler<GetPagedEquipmentsListRequest, PagedEquipmentsListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedEquipmentsListHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
            _languageableService = serviceProvider.GetRequiredService<ILanguageableService>();
        }

        public async Task<PagedEquipmentsListResponse?> Handle(GetPagedEquipmentsListRequest request, CancellationToken cancellationToken = default)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedEquipmentsListResponse, EquipmentListQueryModel, EquipmentListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetEquipmentsQuery(),
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

        private IQueryable<EquipmentListQueryModel> GetEquipmentsQuery()
        {
            return _dbContext.EquipmentListItems
                .FromSqlRaw(EquipmentQueries.GetEquipmentsQuery());
        }
    }
}

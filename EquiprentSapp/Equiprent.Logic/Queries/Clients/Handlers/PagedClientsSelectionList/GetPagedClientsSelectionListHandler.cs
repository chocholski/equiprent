using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsSelectionList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.Clients.Handlers.PagedClientsSelectionList
{
    public class GetPagedClientsSelectionListHandler : IRequestHandler<GetPagedClientsSelectionListRequest, PagedClientsSelectionListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedClientsSelectionListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedClientsSelectionListResponse?> Handle(GetPagedClientsSelectionListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedClientsSelectionListResponse, Client, Client, ClientSelectionListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetClientsSelectionListQuery(),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<ClientSelectionListItemViewModel, ClientTypeToLanguage>(
                    response.List,
                    idPropertyName: nameof(ClientSelectionListItemViewModel.TypeId),
                    namePropertyName: nameof(ClientSelectionListItemViewModel.TypeName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private IQueryable<Client> GetClientsSelectionListQuery()
        {
            return _dbContext.Clients
                .Include(c => c.ClientType)
                .Where(c => !c.IsDeleted);
        }
    }
}

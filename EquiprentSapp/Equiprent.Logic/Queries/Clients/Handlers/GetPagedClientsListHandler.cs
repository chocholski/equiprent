using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.Clients;
using Equiprent.Entities.Business.ClientTypeToLanguages;
using Equiprent.Logic.Queries.Clients.Requests;
using Equiprent.Logic.Queries.Clients.Responses.PagedClientsList;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Clients.Handlers
{
    public class GetPagedClientsListHandler : IQueryHandler<GetPagedClientsListRequest, PagedClientsListResponse>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedClientsListHandler(
            ApplicationDbContext dbContext, 
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedClientsListResponse?> HandleAsync(GetPagedClientsListRequest request)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedClientsListResponse, Client, ClientListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: GetClientListQuery(),
                _serviceProvider);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<ClientListItemViewModel, ClientTypeToLanguage>(
                    response.List,
                    idPropertyName: nameof(ClientListItemViewModel.TypeId),
                    namePropertyName: nameof(ClientListItemViewModel.TypeName));
            }

            return response;
        }

        private IQueryable<Client> GetClientListQuery()
        {
            return _dbContext.Clients
                .Include(c => c.ClientType)
                .Where(c => !c.IsDeleted);
        }
    }
}

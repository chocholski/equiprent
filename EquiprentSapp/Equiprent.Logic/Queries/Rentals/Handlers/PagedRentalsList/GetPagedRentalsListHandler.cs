using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.CustomQueries.Queries.Rentals.Requests;
using Equiprent.Data.CustomQueryTypes.Rentals;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Business.RentalCategoryToLanguages;
using Equiprent.Logic.Queries.Rentals.Requests;
using Equiprent.Logic.Queries.Rentals.Responses.PagedRentalsList;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System.Threading;

namespace Equiprent.Logic.Queries.Rentals.Handlers.PagedRentalsList
{
    public class GetPagedRentalsListHandler : IRequestHandler<GetPagedRentalsListRequest, PagedRentalsListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IMediator _mediator;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedRentalsListHandler(
            ApplicationDbContext dbContext,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _serviceProvider = serviceProvider;
            _languageableService = serviceProvider.GetRequiredService<ILanguageableService>();
            _mediator = serviceProvider.GetRequiredService<IMediator>();
        }

        public async Task<PagedRentalsListResponse?> Handle(GetPagedRentalsListRequest request, CancellationToken cancellationToken)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedRentalsListResponse, RentalListQueryModel, RentalListQueryModel, RentalListItemViewModel>(
                requestParameters: request.RequestParameters,
                query: await GetRentalsQueryAsync(),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<RentalListItemViewModel, RentalCategoryToLanguage>(
                    response.List,
                    idPropertyName: nameof(RentalListItemViewModel.CategoryId),
                    namePropertyName: nameof(RentalListItemViewModel.CategoryName),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private async Task<IQueryable<RentalListQueryModel>> GetRentalsQueryAsync()
        {
            return _dbContext.RentalListItems
                .FromSqlRaw(await _mediator.Send(new GetRentalListQueryRequest(_dbContext)));
        }
    }
}

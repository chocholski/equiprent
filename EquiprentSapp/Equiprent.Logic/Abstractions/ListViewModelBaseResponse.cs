using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders;
using Equiprent.Data.CustomQueryTypes.Audits;
using Equiprent.Logic.Attributes;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using Microsoft.Extensions.DependencyInjection;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;

namespace Equiprent.Logic.Abstractions
{
    public abstract class ListViewModelBaseResponse<TEntity, TEntitySelectionModel, TEntityItemViewModel>
        where TEntity : class
        where TEntitySelectionModel : class
        where TEntityItemViewModel : class
    {
        protected readonly RequestParameters _requestParameters;
        protected readonly IQueryable<TEntity> _query;
        protected readonly Expression<Func<TEntity, TEntitySelectionModel>> _selector;
        protected readonly IServiceProvider _serviceProvider;

        public List<TEntityItemViewModel> List { get; private set; } = new();
        public int TotalRowsCount { get; private set; }

        public ListViewModelBaseResponse(
            RequestParameters requestParameters,
            IQueryable<TEntity> query,
            IServiceProvider serviceProvider,
            Expression<Func<TEntity, TEntitySelectionModel>>? selector = null)
        {
            _requestParameters = requestParameters;
            _query = query;
            _serviceProvider = serviceProvider;
            _selector = selector ?? (e => GetDefaultSelectorResultForEntity(e));
        }

        public async Task FetchAsync(CancellationToken cancellationToken = default)
        {
            var list = await GetFetchedQueryAsync(cancellationToken);
            if (list is null)
                return;

            foreach (var item in list)
            {
                if (typeof(TEntityItemViewModel) != typeof(FieldNamesItemViewModel) ||
                    !List.Any(i => ((FieldNamesItemViewModel)(object)i).Value == ((AuditListQueryModel)(object)item).FieldName))
                {
                    List.Add(await MapEntityToViewModelAsync(item, cancellationToken));
                }
            }

            TotalRowsCount = await (await GetTotalRowsQueryAsync(cancellationToken)).CountAsync(cancellationToken: cancellationToken);
        }

        protected abstract Task<TEntityItemViewModel> MapEntityToViewModelAsync(TEntitySelectionModel entity, CancellationToken cancellationToken = default);

        private static TEntitySelectionModel GetDefaultSelectorResultForEntity(TEntity entity)
        {
            if (entity is TEntitySelectionModel entityAsSelectionModel)
                return entityAsSelectionModel;

            throw new Exception($"FATAL ERROR! Restricted assignment of type {typeof(TEntity).Name} to type {typeof(TEntitySelectionModel).Name}!");
        }

        private async Task<List<TEntitySelectionModel>?> GetFetchedQueryAsync(CancellationToken cancellationToken = default)
        {
            var sortColumnName = GetSortColumnName();
            if (sortColumnName is null)
                return null;

            var dbStatementBuilder = _serviceProvider.GetService<IDbStatementBuilder>();
            if (dbStatementBuilder is null)
                return null;

            return await _query
                .Where(await dbStatementBuilder.BuildWhereClauseAsync(_requestParameters.SearchCriteria, cancellationToken))
                .OrderBy(dbStatementBuilder.BuildOrderClause(sortColumnName, _requestParameters.SortOrder))
                .Skip(_requestParameters.StartRow)
                .Take(_requestParameters.PageCount)
                .Select(_selector)
                .ToListAsync(cancellationToken);
        }

        private string? GetSortColumnName()
        {
            if (!string.IsNullOrEmpty(_requestParameters.SortColumnName))
                return _requestParameters.SortColumnName;

            return typeof(TEntityItemViewModel).GetProperties()
                .SingleOrDefault(property => property.GetCustomAttribute<SortColumnAttribute>() != null)?
                .Name;
        }

        private async Task<IQueryable<TEntity>> GetTotalRowsQueryAsync(CancellationToken cancellationToken = default)
        {
            var dbStatementBuilder = _serviceProvider.GetService<IDbStatementBuilder>();

            return dbStatementBuilder is not null && !string.IsNullOrEmpty(_requestParameters.SearchCriteria)
                ? _query.Where(await dbStatementBuilder.BuildWhereClauseAsync(_requestParameters.SearchCriteria, cancellationToken))
                : _query;
        }
    }
}

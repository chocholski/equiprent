using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Equiprent.Logic.Attributes;
using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using System.Reflection;

namespace Equiprent.Logic.Abstractions
{
    public abstract class ListViewModelBase<TEntity, TEntityItemViewModel>
        where TEntity : class
        where TEntityItemViewModel : class
    {
        protected readonly IQueryable<TEntity> _query;
        protected readonly RequestParameters _requestParameters;

        protected List<TEntityItemViewModel> List { get; set; } = new();
        protected int TotalRowsCount { get; set; }

        public ListViewModelBase(IQueryable<TEntity> query, RequestParameters requestParameters)
        {
            _query = query;
            _requestParameters = requestParameters;
        }

        public async Task FetchAsync()
        {
            var list = await GetFetchedQueryAsync();

            if (list is null)
                return;

            foreach (var item in list)
                List.Add(await MapEntityToViewModelAsync(item));

            TotalRowsCount = await GetTotalRowsQuery().CountAsync();
        }

        protected abstract Task<TEntityItemViewModel> MapEntityToViewModelAsync(TEntity entity);

        private async Task<List<TEntity>?> GetFetchedQueryAsync()
        {
            var sortColumnName = GetSortColumnName();

            if (sortColumnName is null)
                return null;

            return await _query
                .Where(DbStatementBuilder.BuildWhereClause(_requestParameters.SearchCriteria ?? string.Empty))
                .OrderBy(DbStatementBuilder.BuildOrderClause(sortColumnName, _requestParameters.SortOrder))
                .Skip(_requestParameters.StartRow)
                .Take(_requestParameters.PageCount)
                .ToListAsync();
        }

        private string? GetSortColumnName()
        {
            if (!string.IsNullOrEmpty(_requestParameters.SortColumnName))
                return _requestParameters.SortColumnName;

            return typeof(TEntityItemViewModel).GetProperties()
                .SingleOrDefault(property => property.GetCustomAttribute<SortColumnAttribute>() != null)?
                .Name;
        }

        private IQueryable<TEntity> GetTotalRowsQuery() => 
            !string.IsNullOrEmpty(_requestParameters.SearchCriteria)
                ? _query.Where(DbStatementBuilder.BuildWhereClause(_requestParameters.SearchCriteria!))
                : _query;
    }
}

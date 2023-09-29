﻿using DocumentFormat.OpenXml.Office2010.ExcelAc;
using Equiprent.ApplicationServices.Database;
using Equiprent.Data.CustomQueryTypes;
using Equiprent.Logic.Attributes;
using Equiprent.Logic.Queries.Audits.Reponses.FieldNames;
using System.Reflection;

namespace Equiprent.Logic.Abstractions
{
    public abstract class ListViewModelBaseResponse<TEntity, TEntityItemViewModel>
        where TEntity : class
        where TEntityItemViewModel : class
    {
        protected readonly RequestParameters _requestParameters;
        protected readonly IDbStatementService _dbStatementService;
        protected readonly IQueryable<TEntity> _query;

        public List<TEntityItemViewModel> List { get; private set; } = new();
        public int TotalRowsCount { get; private set; }

        public ListViewModelBaseResponse(
            RequestParameters requestParameters,
            IDbStatementService dbStatementService,
            IQueryable<TEntity> query)
        {
            _requestParameters = requestParameters;
            _dbStatementService = dbStatementService;
            _query = query;
        }

        public async Task FetchAsync()
        {
            var list = await GetFetchedQueryAsync();

            if (list is null)
                return;

            foreach (var item in list)
            {
                if (typeof(TEntityItemViewModel) != typeof(FieldNamesItemViewModel) ||
                    !List.Any(i => ((FieldNamesItemViewModel)(object)i).DbName == ((AuditListQueryModel)(object)item).FieldName))
                {
                    List.Add(await MapEntityToViewModelAsync(item));
                }
            }

            TotalRowsCount = await (await GetTotalRowsQueryAsync()).CountAsync();
        }

        protected abstract Task<TEntityItemViewModel> MapEntityToViewModelAsync(TEntity entity);

        private async Task<List<TEntity>?> GetFetchedQueryAsync()
        {
            var sortColumnName = GetSortColumnName();

            if (sortColumnName is null)
                return null;

            return await _query
                .Where(await _dbStatementService.BuildWhereClauseAsync(_requestParameters.SearchCriteria))
                .OrderBy(_dbStatementService.BuildOrderClause(sortColumnName, _requestParameters.SortOrder))
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

        private async Task<IQueryable<TEntity>> GetTotalRowsQueryAsync() => 
            !string.IsNullOrEmpty(_requestParameters.SearchCriteria)
                ? _query.Where(await _dbStatementService.BuildWhereClauseAsync(_requestParameters.SearchCriteria))
                : _query;
    }
}
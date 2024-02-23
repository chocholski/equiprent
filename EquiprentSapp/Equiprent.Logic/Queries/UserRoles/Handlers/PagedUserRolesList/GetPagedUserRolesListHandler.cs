﻿using Equiprent.ApplicationInterfaces.Languageables;
using Equiprent.Data.DbContext;
using Equiprent.Entities.Application.UserRoles;
using Equiprent.Entities.Application.UserRoleToLanguages;
using Equiprent.Logic.Queries.UserRoles.Requests;
using Equiprent.Logic.Queries.UserRoles.Responses.PagedUserRolesList;
using MediatR;
using System.Threading;

namespace Equiprent.Logic.Queries.UserRoles.Handlers.PagedUserRolesList
{
    public class GetPagedUserRolesListHandler : IRequestHandler<GetPagedUserRolesListRequest, PagedUserRolesListResponse?>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILanguageableService _languageableService;
        private readonly IServiceProvider _serviceProvider;

        public GetPagedUserRolesListHandler(
            ApplicationDbContext dbContext,
            ILanguageableService languageableService,
            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _languageableService = languageableService;
            _serviceProvider = serviceProvider;
        }

        public async Task<PagedUserRolesListResponse?> Handle(GetPagedUserRolesListRequest request, CancellationToken cancellationToken = default)
        {
            var response = await ListViewResponseBuilder.GetListViewResponseAsync<PagedUserRolesListResponse, UserRole, UserRoleDto, UserRoleListItemModel>(
                requestParameters: request.RequestParameters,
                query: GetUserRoleListQuery(),
                _serviceProvider,
                cancellationToken);

            if (response is not null)
            {
                await _languageableService.TranslateListLanguageableValuesAsync<UserRoleListItemModel, UserRoleToLanguage>(
                    response.List,
                    idPropertyName: nameof(UserRoleListItemModel.Id),
                    namePropertyName: nameof(UserRoleListItemModel.Name),
                    cancellationToken: cancellationToken);
            }

            return response;
        }

        private IQueryable<UserRole> GetUserRoleListQuery()
        {
            return _dbContext.UserRoles
                .Where(r => !r.IsDeleted);
        }
    }
}
﻿using Equiprent.ApplicationServices.Database;
using Equiprent.Entities.Application;
using Equiprent.Logic.Abstractions;

namespace Equiprent.Logic.Queries.Users.Responses.PagedUsersList
{
    public class PagedUsersListResponse : ListViewModelBaseResponse<User, UserListItemViewModel>
    {
        public PagedUsersListResponse(
            RequestParameters requestParameters,
            IDbStatementService dbStatementService,
            IQueryable<User> query) : base(requestParameters, dbStatementService, query)
        {
        }

        protected override async Task<UserListItemViewModel> MapEntityToViewModelAsync(User entity) =>
            await Task.FromResult(new UserListItemViewModel
            {
                Id = entity.Id,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                Login = entity.Login,
                UserRoleId = entity.UserRoleId,
                IsActive = entity.IsActive
            });
    }
}
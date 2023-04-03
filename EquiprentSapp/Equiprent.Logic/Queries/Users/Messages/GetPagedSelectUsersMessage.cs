﻿using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetPagedSelectUsersMessage : IQuery<SelectListModel> 
    {
        public RequestParameters RequestParameters { get; }
        public int[] IgnoredUserIds { get; }

        public GetPagedSelectUsersMessage(RequestParameters requestParameters, int[] ignoredUserIds)
        {
            RequestParameters = requestParameters;
            IgnoredUserIds = ignoredUserIds;

            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = "FirstName";
            }
        }
    }
}

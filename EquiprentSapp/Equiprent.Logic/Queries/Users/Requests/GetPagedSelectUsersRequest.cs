using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetPagedSelectUsersRequest : IQuery<SelectListResponse> 
    {
        public RequestParameters RequestParameters { get; }
        public Guid[] IgnoredUserIds { get; }

        public GetPagedSelectUsersRequest(RequestParameters requestParameters, Guid[] ignoredUserIds)
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

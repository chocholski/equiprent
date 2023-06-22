using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.Users.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.Users.Messages
{
    public record GetPagedUsersRequest : IQuery<ListResponse> 
    {
        public RequestParameters RequestParameters { get; }
        public int? UserRoleId { get; set; }

        public GetPagedUsersRequest(RequestParameters requestParameters, int? userRoleId)
        {
            RequestParameters = requestParameters;

            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = "FirstName";
            }
            
            UserRoleId = userRoleId;
        }
    }
}

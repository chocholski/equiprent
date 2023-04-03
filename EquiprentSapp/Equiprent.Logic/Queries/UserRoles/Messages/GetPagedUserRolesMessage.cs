using Equiprent.Logic.Infrastructure.RequestParamsHelpers;
using Equiprent.Logic.Queries.UserRoles.Models;
using static Equiprent.Logic.Infrastructure.CQRS.Queries;

namespace Equiprent.Logic.Queries.UserRoles.Messages
{
    public record GetPagedUserRolesMessage : IQuery<ListModel>
    {
        public RequestParameters RequestParameters { get; }

        public GetPagedUserRolesMessage(RequestParameters requestParameters)
        {
            RequestParameters = requestParameters;

            if (string.IsNullOrEmpty(RequestParameters.SortColumnName) ||
                RequestParameters.SortColumnName == "null")
            {
                RequestParameters.SortColumnName = "Name";
            }
        }
    }
}

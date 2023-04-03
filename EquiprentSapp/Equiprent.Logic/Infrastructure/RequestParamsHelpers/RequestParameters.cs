using Microsoft.AspNetCore.Mvc;

namespace Equiprent.Logic.Infrastructure.RequestParamsHelpers
{
    public class RequestParameters
    {
        [FromQuery(Name="sf")]
        public string? SortColumnName { get; set; }
        [FromQuery(Name="so")]
        public int SortOrder { get; set; }
        [FromQuery(Name="pc")]
        public int PageCount { get; set; }
        [FromQuery(Name = "sr")]
        public int StartRow { get; set; }
        [FromQuery(Name="f")]
        public string? SearchCriteria { get; set; }
    }
}

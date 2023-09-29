using DocumentFormat.OpenXml.Presentation;
using Equiprent.ApplicationServices.Database.Models;
using Equiprent.Extensions;

namespace Equiprent.ApplicationServices.Database
{
#pragma warning disable CA1822 // Mark members as static
    public class DbStatementService : IDbStatementService
    {
        private readonly ISpecialFilterService _specialFilterService;

        public DbStatementService(ISpecialFilterService specialFilterService)
        {
            _specialFilterService = specialFilterService;
        }

        public string BuildOrderClause(string? columnName, int sortOrder) =>
            $"{(!string.IsNullOrEmpty(columnName) ? $"{columnName} " : string.Empty)}{(sortOrder == 1 ? "asc" : "desc")}";

        public async Task<string> BuildWhereClauseAsync(string? searchCriteria) =>
            await BuildWhereClauseAsync(WhereClauseCriteria.Create(searchCriteria).Criteria);

        public async Task<string> BuildWhereClauseAsync(List<WhereClauseCriteria>? criteria)
        {
            if (criteria.IsNullOrEmpty())
                return "1 = 1";

            var resultBuilder = new StringBuilder();

            foreach (var criterion in criteria!)
            {
                var conditionBuilder = new StringBuilder(
                    criterion!.Mode switch
                    {
                        MatchModeEnum.Contains =>
                            $"{criterion.FieldName}.Contains(\"{criterion.FieldValue}\")",
                        MatchModeEnum.EndsWith =>
                            $"{criterion.FieldName}.EndsWith(\"{criterion.FieldValue}\")",
                        MatchModeEnum.Equals =>
                            $"{criterion.FieldName}.Equals(\"{criterion.FieldValue}\")",
                        MatchModeEnum.In =>
                            $"new[] {{ {string.Join(",", criterion.FieldValue!.Split(",").Select(value => $"\"{value}\""))} }}.Contains({criterion.FieldName}.ToString())",
                        MatchModeEnum.NotContains =>
                            $"!{criterion.FieldName}.Contains(\"{criterion.FieldValue}\")",
                        MatchModeEnum.NotEquals =>
                            $"!{criterion.FieldName}.Equals(\"{criterion.FieldValue}\")",
                        MatchModeEnum.StartsWith =>
                            $"{criterion.FieldName}.StartsWith(\"{criterion.FieldValue}\")",
                        _ => string.Empty
                    });

                if (conditionBuilder.Length > 0)
                {
                    conditionBuilder.Append(
                        criterion!.Operator switch
                        {
                            SearchOperatorEnum.And => " && ",
                            SearchOperatorEnum.Or => " || ",
                            _ => " && "
                        });

                    resultBuilder.Append(conditionBuilder);
                }
            }

            resultBuilder.RemoveFromEnd(" && ");
            resultBuilder.RemoveFromEnd(" || ");

            if (resultBuilder.Length == 0)
                return "1 = 1";

            return resultBuilder.ToString();
        }

        private string GetDateAsText(DateTime date) => $"{date.Year}-{date.Month}-{date.Day} {date.TimeOfDay}";

        private string GetDateEqualCondition(WhereClauseCriteria criteria)
        {
            var date = DateTime.Parse(criteria.FieldValue!);

            return $"({criteria.FieldName!} >= \"{GetDateAsText(date)}\" && {criteria.FieldName!} < \"{GetDateAsText(date.AddDays(1))}\") && ";
        }

        private string GetNumberEqualCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number) && number != -1
                ? $"({criteria.FieldName!} == {number}) && "
                : string.Empty;

        private string GetBoolEqualCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var boolean) && boolean >= 0
                ? $"({criteria.FieldName!} == {Convert.ToBoolean(boolean)}) && "
                : string.Empty;
    }
#pragma warning restore CA1822 // Mark members as static
}

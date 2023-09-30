using Equiprent.ApplicationServices.Database.Models;
using Equiprent.Extensions;

namespace Equiprent.ApplicationServices.Database
{
#pragma warning disable CA1822 // Mark members as static
    public class DbStatementService : IDbStatementService
    {
        private readonly ISpecialFilterService _specialFilterService;

        private TimeSpan startOfDay => TimeSpan.Zero;
        private TimeSpan endOfDay => TimeSpan.FromHours(23) + TimeSpan.FromMinutes(59) + TimeSpan.FromSeconds(59);

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
                            GetContainsCondition(criterion!),
                        MatchModeEnum.DateIs =>
                            GetDateIsCondition(criterion!),
                        MatchModeEnum.DateIsAfter =>
                            GetDateIsAfterCondition(criterion!),
                        MatchModeEnum.DateIsBefore =>
                            GetDateIsBeforeCondition(criterion!),
                        MatchModeEnum.DateIsNot =>
                            GetDateIsNotCondition(criterion!),
                        MatchModeEnum.EndsWith =>
                            $"{criterion.FieldName}.EndsWith(\"{criterion.FieldValue}\")",
                        MatchModeEnum.Equals =>
                            $"({criterion.FieldName}{(criterion.Type == FilterTypeEnum.Numeric ? ".ToString()" : string.Empty)}).Equals(\"{criterion.FieldValue}\")",
                        MatchModeEnum.GreaterThan =>
                            GetNumberGreaterThanCondition(criterion!),
                        MatchModeEnum.GreaterThanOrEqualTo =>
                            GetNumberGreaterThanOrEqualToCondition(criterion!),
                        MatchModeEnum.In =>
                            $"new[] {{ {string.Join(",", criterion.FieldValue!.Split(",").Select(value => $"\"{value}\""))} }}.Contains({criterion.FieldName}.ToString())",
                        MatchModeEnum.LessThan =>
                            GetNumberLessThanCondition(criterion!),
                        MatchModeEnum.LessThanOrEqualTo =>
                            GetNumberLessThanOrEqualToCondition(criterion!),
                        MatchModeEnum.NotContains =>
                            $"!{criterion.FieldName}.Contains(\"{criterion.FieldValue}\")",
                        MatchModeEnum.NotEquals =>
                            $"!({criterion.FieldName}{(criterion.Type == FilterTypeEnum.Numeric ? ".ToString()" : string.Empty)}).Equals(\"{criterion.FieldValue}\")",
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

        private string GetContainsCondition(WhereClauseCriteria criteria) =>
            criteria.FieldValue is "true" or "false"
                ? $"{criteria.FieldName} == {criteria.FieldValue is "true"}"
                : $"{criteria.FieldName}.Contains(\"{criteria.FieldValue}\")";

        private string GetDateAsText(DateTime date, bool? withStartOfDay = null) =>
            $"{date.Year}-{date.Month}-{date.Day} {(withStartOfDay.HasValue ? (withStartOfDay.Value ? startOfDay : endOfDay) : date.TimeOfDay)}";

        private string GetDateIsCondition(WhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"({criteria.FieldName} >= \"{GetDateAsText(date)}\" && {criteria.FieldName} < \"{GetDateAsText(date.AddDays(1))}\")"
                : string.Empty;

        private string GetDateIsAfterCondition(WhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"{criteria.FieldName} >= \"{GetDateAsText(date.AddDays(1), withStartOfDay: true)}\""
                : string.Empty;

        private string GetDateIsBeforeCondition(WhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"{criteria.FieldName} < \"{GetDateAsText(date, withStartOfDay: true)}\""
                : string.Empty; 

        private string GetDateIsNotCondition(WhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"({criteria.FieldName} < \"{GetDateAsText(date, withStartOfDay: true)}\" && {criteria.FieldName} > \"{GetDateAsText(date, withStartOfDay: false)}\")"
                : string.Empty;

        private string GetNumberGreaterThanCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} > {number})"
                : string.Empty;

        private string GetNumberGreaterThanOrEqualToCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} >= {number})"
                : string.Empty;

        private string GetNumberLessThanCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} < {number})"
                : string.Empty;

        private string GetNumberLessThanOrEqualToCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} <= {number})"
                : string.Empty;

        private string GetBoolEqualCondition(WhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var boolean) && boolean >= 0
                ? $"({criteria.FieldName!} == {Convert.ToBoolean(boolean)})"
                : string.Empty;
    }
#pragma warning restore CA1822 // Mark members as static
}

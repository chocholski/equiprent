using Equiprent.ApplicationImplementations.Database.DbStatementBuilders.Models.WhereClauseCriterias;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.FilterTypes;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.MatchModes;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.SearchOperators;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias;
using Equiprent.ApplicationInterfaces.Database.Filtering.SpecialFiltering;
using Equiprent.Extensions;
using System.Text;

namespace Equiprent.ApplicationImplementations.Database.DbStatementBuilders
{
    public class DbStatementBuilder : IDbStatementBuilder
    {
        private readonly ISpecialFilterBuilder _specialFilterBuilder;

        private static TimeSpan StartOfDay => TimeSpan.Zero;
        private static TimeSpan EndOfDay => TimeSpan.FromHours(23) + TimeSpan.FromMinutes(59) + TimeSpan.FromSeconds(59);

        public DbStatementBuilder(ISpecialFilterBuilder specialFilterBuilder)
        {
            _specialFilterBuilder = specialFilterBuilder;
        }

        public string BuildOrderClause(string? columnName, int sortOrder) =>
            $"{(!string.IsNullOrEmpty(columnName) ? $"{columnName} " : string.Empty)}{(sortOrder == 1 ? "asc" : "desc")}";

        public async Task<string> BuildWhereClauseAsync(string? searchCriteria, CancellationToken cancellationToken = default) =>
            await BuildWhereClauseAsync(WhereClauseCriteria.Create(searchCriteria).Criteria, cancellationToken);

        public async Task<string> BuildWhereClauseAsync(List<IWhereClauseCriteria>? criteria, CancellationToken cancellationToken = default)
        {
            if (criteria.IsNullOrEmpty())
                return "1 = 1";

            var resultBuilder = new StringBuilder();

            foreach (var criterion in criteria!)
            {
                var conditionBuilder = new StringBuilder(
                    criterion!.Type == FilterTypeEnum.Special
                        ? await _specialFilterBuilder.BuildSpecialConditionAsync(criterion)
                        : criterion!.Mode switch
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

        private static string GetContainsCondition(IWhereClauseCriteria criteria) =>
            criteria.FieldValue is "true" or "false"
                ? $"{criteria.FieldName} == {criteria.FieldValue is "true"}"
                : $"{criteria.FieldName}.Contains(\"{criteria.FieldValue}\")";

        private static string GetDateAsText(DateTime date, bool? withStartOfDay = null) =>
            $"{date.Year}-{date.Month}-{date.Day} {(withStartOfDay.HasValue ? withStartOfDay.Value ? StartOfDay : EndOfDay : date.TimeOfDay)}";

        private static string GetDateIsCondition(IWhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"({criteria.FieldName} >= \"{GetDateAsText(date)}\" && {criteria.FieldName} < \"{GetDateAsText(date.AddDays(1))}\")"
                : string.Empty;

        private static string GetDateIsAfterCondition(IWhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"{criteria.FieldName} >= \"{GetDateAsText(date.AddDays(1), withStartOfDay: true)}\""
                : string.Empty;

        private static string GetDateIsBeforeCondition(IWhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"{criteria.FieldName} < \"{GetDateAsText(date, withStartOfDay: true)}\""
                : string.Empty;

        private static string GetDateIsNotCondition(IWhereClauseCriteria criteria) =>
            DateTime.TryParse(criteria.FieldValue, out var date)
                ? $"({criteria.FieldName} < \"{GetDateAsText(date, withStartOfDay: true)}\" && {criteria.FieldName} > \"{GetDateAsText(date, withStartOfDay: false)}\")"
                : string.Empty;

        private static string GetNumberGreaterThanCondition(IWhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} > {number})"
                : string.Empty;

        private static string GetNumberGreaterThanOrEqualToCondition(IWhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} >= {number})"
                : string.Empty;

        private static string GetNumberLessThanCondition(IWhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} < {number})"
                : string.Empty;

        private static string GetNumberLessThanOrEqualToCondition(IWhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var number)
                ? $"({criteria.FieldName!} <= {number})"
                : string.Empty;

        private static string GetBoolEqualCondition(IWhereClauseCriteria criteria) =>
            int.TryParse(criteria.FieldValue, out var boolean) && boolean >= 0
                ? $"({criteria.FieldName!} == {Convert.ToBoolean(boolean)})"
                : string.Empty;
    }
}

using Equiprent.ApplicationServices.Database.Models.FilterTypes;
using Equiprent.ApplicationServices.Database.Models.MatchModes;
using Equiprent.ApplicationServices.Database.Models.SearchOperators;

namespace Equiprent.ApplicationServices.Database.Models
{
    public class WhereClauseCriteria
    {
        public string? FieldName { get; set; }
        public MatchModeEnum? Mode { get; set; }
        public string? FieldValue { get; set; }
        public SearchOperatorEnum? Operator { get; set; }
        public FilterTypeEnum? Type { get; set; }
        public List<WhereClauseCriteria> Criteria { get; private set; } = new();

        private static readonly string[] expressionSeparator = { "||" };

        private WhereClauseCriteria()
        {
        }

        private WhereClauseCriteria(
            string? fieldName,
            MatchModeEnum? matchMode,
            string? fieldValue,
            SearchOperatorEnum? searchOperator,
            FilterTypeEnum filterType = FilterTypeEnum.Text)
        {
            FieldName = fieldName;
            Mode = matchMode;
            FieldValue = fieldValue;
            Operator = searchOperator;
            Type = filterType;
        }

        public static WhereClauseCriteria Create(string? searchCriteria) =>
            new WhereClauseCriteria().WithPopulatedSearchCriteria(searchCriteria);

        private WhereClauseCriteria WithPopulatedSearchCriteria(string? searchCriteria)
        {
            if (searchCriteria is null)
                return this;

            foreach (var columnDefinition in searchCriteria.Split(expressionSeparator, StringSplitOptions.RemoveEmptyEntries))
            {
                if (TryParse(columnDefinition, out WhereClauseCriteria parsedCriteria))
                    Criteria.Add(parsedCriteria);
            }

            return this;
        }

        private static bool TryParse(string columnDefinition, out WhereClauseCriteria parsedCriteria)
        {
            var splitColumnDefinition = columnDefinition.Split('|');

            parsedCriteria = splitColumnDefinition.Length switch
            {
                5 => new WhereClauseCriteria(
                    splitColumnDefinition[0],
                    MatchMode.GetValue(splitColumnDefinition[1]),
                    splitColumnDefinition[2],
                    SearchOperator.GetValue(splitColumnDefinition[3]),
                    FilterType.GetValue(splitColumnDefinition[4])),
                4 => new WhereClauseCriteria(
                    splitColumnDefinition[0],
                    MatchMode.GetValue(splitColumnDefinition[1]),
                    splitColumnDefinition[2],
                    SearchOperator.GetValue(splitColumnDefinition[3])),
                3 => new WhereClauseCriteria(
                    splitColumnDefinition[0],
                    MatchMode.GetValue(splitColumnDefinition[1]),
                    splitColumnDefinition[2],
                    searchOperator: null),
                2 => new WhereClauseCriteria(
                    splitColumnDefinition[0],
                    MatchMode.GetValue(splitColumnDefinition[1]),
                    fieldValue: null,
                    searchOperator: null),
                1 => new WhereClauseCriteria(
                    splitColumnDefinition[0],
                    matchMode: null,
                    fieldValue: null,
                    searchOperator: null),
                _ => new WhereClauseCriteria(
                    fieldName: null,
                    matchMode: null,
                    fieldValue: null,
                    searchOperator: null)
            };

            return !string.IsNullOrEmpty(parsedCriteria.FieldName) &&
                parsedCriteria.Mode.HasValue &&
                !string.IsNullOrEmpty(parsedCriteria.FieldValue) &&
                parsedCriteria.Operator.HasValue;
        }
    }
}

namespace Equiprent.ApplicationServices.Database
{
    public class WhereClauseCriteria
    {
        public string? FieldName { get; set; }
        public string? FieldValue { get; set; }
        public WhereClauseOperatorEnum? Operator { get; set; }
        public List<WhereClauseCriteria> Criteria { get; private set; } = new();

        private static readonly string[] expressionSeparator = { "||" };

        private WhereClauseCriteria()
        {
        }

        private WhereClauseCriteria(string? fieldName, string? fieldValue, WhereClauseOperatorEnum? whereClauseOperator)
        {
            FieldName = fieldName;
            FieldValue = fieldValue;
            Operator = whereClauseOperator;
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
                3 =>
                    new WhereClauseCriteria(
                        splitColumnDefinition[0],
                        splitColumnDefinition[1],
                        Enum.TryParse(splitColumnDefinition[2], out WhereClauseOperatorEnum whereClauseOperator)
                            ? whereClauseOperator
                            : null),
                2 => new WhereClauseCriteria(splitColumnDefinition[0], splitColumnDefinition[1], whereClauseOperator: null),
                1 => new WhereClauseCriteria(splitColumnDefinition[0], fieldValue: null, whereClauseOperator: null),
                _ => new WhereClauseCriteria(fieldName: null, fieldValue: null, whereClauseOperator: null)
            };

            return !string.IsNullOrEmpty(parsedCriteria.FieldName) &&
                !string.IsNullOrEmpty(parsedCriteria.FieldValue) &&
                parsedCriteria.Operator.HasValue;
        }
    }
}

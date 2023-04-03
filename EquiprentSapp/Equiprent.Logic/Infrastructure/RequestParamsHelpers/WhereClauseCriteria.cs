namespace Equiprent.Logic.Infrastructure.RequestParamsHelpers
{
    public class WhereClauseCriteria
    {
        public string FieldName { get; set; } = null!;
        public string FieldValue { get; set; } = null!;
        public WhereClauseOperatorEnum Operator { get; set; }
        public List<WhereClauseCriteria> Criteria { get; private set; } = null!;

        private static readonly string[] expressionSeparator = { "||" };
        public void PopulateSearchCriteria(string searchCriteria)
        {
            if (searchCriteria != null)
            {
                if (Criteria == null)
                {
                    Criteria = new List<WhereClauseCriteria>();
                }

                var columns = searchCriteria.Split(expressionSeparator, StringSplitOptions.RemoveEmptyEntries);
                foreach (var columnDefinition in columns)
                {
                    Criteria.Add(ParseCriteria(columnDefinition));
                }
            }
        }

        private WhereClauseCriteria ParseCriteria(string columnDefinition)
        {
            var criteria = new WhereClauseCriteria();
            var column = columnDefinition.Split('|');
            criteria.FieldName = column[0];
            criteria.FieldValue = column[1];
            criteria.Operator = (WhereClauseOperatorEnum)Convert.ToInt32(column[2]);
            return criteria;
        }
    }
}

using Equiprent.Logic.Infrastructure.SpecialFilters;

namespace Equiprent.Logic.Infrastructure.RequestParamsHelpers
{
    public class DbStatementBuilder
    {
        private static string? CreateCondition(WhereClauseCriteria criteria, int? currentUserId = null)
        {
            switch (criteria.Operator)
            {
                case WhereClauseOperatorEnum.Like:
                    return $"{criteria.FieldName}.Contains(\"{criteria.FieldValue}\") && ";
                case WhereClauseOperatorEnum.StringEqual:
                    return $"{criteria.FieldName} == \"{criteria.FieldValue}\" && ";
                case WhereClauseOperatorEnum.DateEqual:
                    var date = DateTime.Parse(criteria.FieldValue);
                    string dateString = $"{date.Year}-{date.Month}-{date.Day} {date.TimeOfDay}";
                    date = date.AddDays(1);
                    string dateWithAddedDayString = $"{date.Year}-{date.Month}-{date.Day} {date.TimeOfDay}";
                    return $"({criteria.FieldName} >= \"{dateString}\" && {criteria.FieldName} < \"{dateWithAddedDayString}\") && ";
                case WhereClauseOperatorEnum.NumberEqual:
                    if (Int32.TryParse(criteria.FieldValue, out var number))
                    {
                        // Jeżeli wybrano opcję '-- Wszystkie --'
                        if (number == -1)
                            return string.Empty;

                        return $"({criteria.FieldName} == {number}) && ";
                    }
                    return null;
                case WhereClauseOperatorEnum.BoolEqual:
                    if (Int32.TryParse(criteria.FieldValue, out var boolean) && boolean >= 0)
                    {
                        return $"({criteria.FieldName} == {Convert.ToBoolean(boolean)}) && ";
                    }
                    return null;
                case WhereClauseOperatorEnum.Special:
                    return SpecialFiltersHelper.CreateSpecialCondition(criteria.FieldName, criteria.FieldValue, currentUserId);
                case WhereClauseOperatorEnum.Ignore:
                    return null;
                default:
                    throw new NotImplementedException($"{criteria.Operator} is not implemented");
            }
        }

        public static string BuildWhereClause(string searchCriteria, int? currentUserId = null)
        {
            var sc = new WhereClauseCriteria();
            sc.PopulateSearchCriteria(searchCriteria);
            return BuildWhereClause(sc.Criteria, currentUserId);
        }

        public static string BuildWhereClause(List<WhereClauseCriteria> searchCriteria, int? currentUserId = null)
        {
            if (searchCriteria != null)
            {
                StringBuilder result = new StringBuilder();
                foreach (var criterion in searchCriteria)
                {
                    var condition = CreateCondition(criterion, currentUserId);
                    if (condition != null)
                    {
                        result.Append(condition);
                    }
                }

                if (result.Length > 0)
                {
                    result.Remove(result.Length - 4, 4);
                    return result.ToString();
                }
            }

            return "1 = 1";
        }

        public static string BuildOrderClause(string columnName, int sortOrder)
        {
            return $"{columnName} {(sortOrder == 1 ? "asc" : "desc")}";
        }
    }
}

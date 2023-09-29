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
                var condition = criterion.Operator switch
                {
                    WhereClauseOperatorEnum.Like => $"{criterion!.FieldName}.Contains(\"{criterion.FieldValue}\") && ",
                    WhereClauseOperatorEnum.StringEqual => $"{criterion!.FieldName} == \"{criterion.FieldValue}\" && ",
                    WhereClauseOperatorEnum.DateEqual => GetDateEqualCondition(criterion!),
                    WhereClauseOperatorEnum.NumberEqual => GetNumberEqualCondition(criterion!),
                    WhereClauseOperatorEnum.BoolEqual => GetBoolEqualCondition(criterion!),
                    WhereClauseOperatorEnum.Special => await _specialFilterService.CreateSpecialConditionAsync(criteria, criterion!.FieldName, criterion!.FieldValue),
                    WhereClauseOperatorEnum.Ignore => null,
                    _ => throw new NotImplementedException($"{criterion!.Operator} is not implemented")
                };

                if (condition is not null)
                    resultBuilder.Append(condition);
            }

            resultBuilder.RemoveFromEnd(" && ");

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

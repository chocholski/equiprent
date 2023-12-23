using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.FilterTypes;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.MatchModes;
using Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.SearchOperators;

namespace Equiprent.ApplicationInterfaces.Database.DbStatementBuilders.Models.WhereClauseCriterias
{
    public interface IWhereClauseCriteria
    {
        public string? FieldName { get; set; }
        public MatchModeEnum? Mode { get; set; }
        public string? FieldValue { get; set; }
        public SearchOperatorEnum? Operator { get; set; }
        public FilterTypeEnum? Type { get; set; }
        public List<IWhereClauseCriteria> Criteria { get; }
    }
}

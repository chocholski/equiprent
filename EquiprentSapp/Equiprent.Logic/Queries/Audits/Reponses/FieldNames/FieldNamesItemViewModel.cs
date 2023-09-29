using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Audits.Reponses.FieldNames
{
    public class FieldNamesItemViewModel
    {
        public string DbName { get; set; } = null!;

        [SortColumn]
        public string Translation { get; set; } = null!;
    }
}

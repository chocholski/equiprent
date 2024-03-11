using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory
{
    public class ObjectHistoryItemViewModel
    {
        [SortColumn]
        public DateTime CreatedOn { get; set; }

        public required string FieldName { get; set; }

        public string? NewValue { get; set; }

        public string? OldValue { get; set; }

        public required string Translation { get; set; }

        public required string UserName { get; set; }
    }
}

using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.Queries.Audits.Reponses.ObjectHistory
{
    public class ObjectHistoryItemViewModel
    {
        [SortColumn]
        public DateTime CreatedOn { get; set; }

        public string FieldName { get; set; } = null!;

        public string? NewValue { get; set; }

        public string? OldValue { get; set; }

        public string Translation { get; set; } = null!;

        public string UserName { get; set; } = null!;
    }
}

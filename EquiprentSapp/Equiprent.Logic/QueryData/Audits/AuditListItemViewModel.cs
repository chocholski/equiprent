using Equiprent.Logic.Attributes;

namespace Equiprent.Logic.QueryData.Audits
{
    public class AuditListItemViewModel
    {
        [SortColumn]
        public DateTime CreatedOn { get; set; }

        public string FieldName { get; set; } = null!;

        public string? OldValue { get; set; }

        public string? NewValue { get; set; }

        public string UserName { get; set; } = null!;

        public string Translation { get; set; } = null!;
    }
}

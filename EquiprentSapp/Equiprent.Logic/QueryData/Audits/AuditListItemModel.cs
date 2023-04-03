namespace Equiprent.Logic.QueryData.Audits
{
    public class AuditListViewModel
    {
        public int TotalRowsCount { get; set; }
        public List<AuditListItemModel> List { get; set; }

        public AuditListViewModel()
        {
            List = new List<AuditListItemModel>();
        }
    }

    public class AuditListItemModel
    {
        public DateTime CreatedOn { get; set; }
        public string FieldName { get; set; } = null!;
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
        public string UserName { get; set; } = null!;
        public string Translation { get; set; } = null!;
    }

    public class AuditTranslationItemViewModel
    {
        public string DbName { get; set; } = null!;
        public string Translation { get; set; } = null!;
    }
}

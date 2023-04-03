namespace Equiprent.Data.CustomQueryTypes
{
    public class AuditListQueryModel
    {
        public DateTime CreatedOn { get; set; }
        public string UserName { get; set; } = null!;
        public string FieldName { get; set; } = null!;
        public string? OldValue { get; set; }
        public string? NewValue { get; set; }
    }
}
